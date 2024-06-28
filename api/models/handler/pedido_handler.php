<?php
require_once('../../helpers/database.php');
class PedidoHandler
{
    protected $id = null;
    protected $detalle_pedido_id = null;
    protected $cliente = null;
    protected $producto = null;
    protected $detalle_cantidad = null;
    protected $direccion = null;
    protected $estado = null;

    public function searchRows()
    {
        $searchValue = Validator::getSearchValue();
        $value = '%' . $searchValue . '%';
        $sql = "SELECT 
            p.pedido_id AS id_pedido,
            CONCAT(u.usuario_nombre, ' ', u.usuario_apellido) AS nombre_cliente,
            SUM(dp.detalle_precio * dp.detalle_cantidad) AS precio_total,
            p.pedido_direccion AS direccion,
            p.pedido_estado AS estado
        FROM 
            tb_pedidos p
        INNER JOIN 
            tb_usuarios u ON p.usuario_id = u.usuario_id
        INNER JOIN 
            tb_detalles_pedidos dp ON p.pedido_id = dp.pedido_id
        WHERE 
            p.pedido_id LIKE ? OR
            u.usuario_apellido LIKE ? OR
            u.usuario_nombre LIKE ? OR
            p.pedido_direccion LIKE ? OR
            p.pedido_estado LIKE ?
        GROUP BY
            p.pedido_id";
        $params = array($value, $value, $value, $value, $value  );
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = "SELECT p.pedido_id AS 'id_pedido',
            CONCAT(u.usuario_nombre, ' ', u.usuario_apellido) AS 'nombre_cliente',
            SUM(dp.detalle_precio * dp.detalle_cantidad) AS 'precio_total',
            p.pedido_direccion AS 'direccion',
            p.pedido_estado AS 'estado'
            FROM tb_pedidos p
            INNER JOIN tb_usuarios u ON p.usuario_id = u.usuario_id
            INNER JOIN tb_detalles_pedidos dp ON p.pedido_id = dp.pedido_id
            GROUP BY p.pedido_id, u.usuario_nombre, u.usuario_apellido, p.pedido_direccion, p.pedido_estado;";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = "SELECT p.pedido_id AS 'id_pedido',
            CONCAT(u.usuario_nombre, ' ', u.usuario_apellido) AS 'nombre_cliente',
            SUM(dp.detalle_precio * dp.detalle_cantidad) AS 'precio_total',
            p.pedido_direccion AS 'direccion',
            p.pedido_estado AS 'estado'
            FROM tb_pedidos p
            INNER JOIN tb_usuarios u ON p.usuario_id = u.usuario_id
            INNER JOIN tb_detalles_pedidos dp ON p.pedido_id = dp.pedido_id
            WHERE p.pedido_id = ?
            GROUP BY p.pedido_id, u.usuario_nombre, u.usuario_apellido, p.pedido_direccion, p.pedido_estado;";
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = "DELETE tb_comentarios FROM tb_comentarios JOIN tb_detalles_pedidos ON tb_comentarios.detalle_pedido_id = tb_detalles_pedidos.detalle_pedido_id WHERE tb_detalles_pedidos.pedido_id = ?;
                DELETE tb_detalles_pedidos FROM tb_detalles_pedidos WHERE tb_detalles_pedidos.pedido_id = ?;
                DELETE tb_pedidos FROM tb_pedidos WHERE tb_pedidos.pedido_id = ?";
        $params = array($this->id, $this->id, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_pedidos SET pedido_estado = NOT pedido_estado WHERE pedido_id=?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function getOrder()
    {
        $this->estado = 'Pendiente';
        $sql = 'SELECT pedido_id
                FROM tb_pedidos
                WHERE pedido_estado = ? AND usuario_id = ?';
        $params = array($this->estado, $_SESSION['usuario_id']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['pedido_id'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $sql = 'INSERT INTO tb_pedidos(pedido_direccion, usuario_id)
                    VALUES("Aun no definida", ?)';
            $params = array($_SESSION['usuario_id']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO tb_detalles_pedidos(producto_id, detalle_precio, detalle_cantidad, pedido_id)
                VALUES(?, (SELECT producto_precio FROM tb_productos WHERE producto_id = ?), ?, ?)';
        $params = array($this->producto, $this->producto, $this->detalle_cantidad, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readDetail()
    {
        $sql = 'SELECT detalle_pedido_id, producto_nombre, detalle_precio, detalle_cantidad, producto_imagen
                FROM tb_detalles_pedidos    
                INNER JOIN tb_pedidos USING(pedido_id)
                INNER JOIN tb_productos USING(producto_id)
                WHERE pedido_id = ?';
        $params = array($_SESSION['idPedido']);
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Finalizado';
        $sql = 'UPDATE tb_pedidos
                SET pedido_estado = ?, pedido_direccion = ?
                WHERE pedido_id = ?';
        $params = array($this->estado, $this->direccion, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE tb_detalles_pedidos
                SET detalle_cantidad = ?
                WHERE detalle_pedido_id = ? AND pedido_id = ?';
        $params = array($this->detalle_cantidad, $this->detalle_pedido_id, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM tb_detalles_pedidos
                WHERE detalle_pedido_id = ? AND pedido_id = ?';
        $params = array($this->detalle_pedido_id, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    public function getHistory()
    {
        $sql = "SELECT p.*, u.usuario_nombre, u.usuario_apellido, p.pedido_fechaSolicitud, p.pedido_fechaEntrega, p.pedido_direccion, SUM(dp.detalle_precio * dp.detalle_cantidad) AS precio_total
                FROM tb_pedidos p
                JOIN tb_usuarios u ON p.usuario_id = u.usuario_id
                JOIN tb_detalles_pedidos dp ON p.pedido_id = dp.pedido_id
                WHERE p.usuario_id = ?
                AND p.pedido_estado <> 'Pendiente'
                GROUP BY p.pedido_id DESC;";
        $params = array($_SESSION['usuario_id']);
        return Database::getRows($sql, $params);
    }

    public function getHistoryProducts()
    {
        $sql = "SELECT p.producto_nombre, dp.detalle_precio, dp.detalle_cantidad
                FROM tb_detalles_pedidos dp
                INNER JOIN tb_productos p ON dp.producto_id = p.producto_id
                WHERE dp.pedido_id = ?;";
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }
}
?>
