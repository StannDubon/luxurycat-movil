<?php
require_once('../../helpers/database.php');

class ProductoHandler
{
    protected $id = null;
    protected $categoria_id = null;
    protected $marca_id = null;
    protected $descripcion = null;
    protected $nombre = null;
    protected $precio = null;
    protected $imagen = null;
    protected $cantidad = null;
    protected $estado = null;

    protected $nombre_categoria = null;

    const RUTA_IMAGEN = '../../images/productos/';

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT p.producto_id, c.categoria_nombre AS categoria, m.marca_nombre AS marca, p.*
                FROM tb_productos p
                JOIN tb_categorias c ON p.categoria_id = c.categoria_id
                JOIN tb_marcas m ON p.marca_id = m.marca_id
                WHERE producto_nombre LIKE ? OR producto_descripcion LIKE ?
                ORDER BY producto_nombre';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_productos(categoria_id, marca_id, producto_descripcion, producto_nombre, producto_precio, producto_imagen, producto_cantidad, producto_estado)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->categoria_id, $this->marca_id, $this->descripcion, $this->nombre, $this->precio, $this->imagen, $this->cantidad, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT p.producto_id, c.categoria_nombre AS categoria, m.marca_nombre AS marca, p.*
                FROM tb_productos p
                JOIN tb_categorias c ON p.categoria_id = c.categoria_id
                JOIN tb_marcas m ON p.marca_id = m.marca_id;
                ';
        return Database::getRows($sql);
    }

    public function readActive()
    {
        $sql = 'SELECT p.producto_id, c.categoria_nombre AS categoria, m.marca_nombre AS marca, p.*
                FROM tb_productos p
                JOIN tb_categorias c ON p.categoria_id = c.categoria_id
                JOIN tb_marcas m ON p.marca_id = m.marca_id
                WHERE producto_estado = 1;';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT p.producto_id, c.categoria_nombre AS categoria, m.marca_nombre AS marca, p.*
                FROM tb_productos p
                JOIN tb_categorias c ON p.categoria_id = c.categoria_id
                JOIN tb_marcas m ON p.marca_id = m.marca_id
                WHERE p.producto_id = ?;';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readOneActive()
    {
        $sql = 'SELECT p.producto_id, c.categoria_nombre AS categoria, m.marca_nombre AS marca, p.*
                FROM tb_productos p
                JOIN tb_categorias c ON p.categoria_id = c.categoria_id
                JOIN tb_marcas m ON p.marca_id = m.marca_id
                WHERE p.producto_id = ?;';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_productos
                SET categoria_id = ?, marca_id = ?, producto_descripcion = ?, producto_nombre = ?, producto_precio = ?, producto_imagen = ?, producto_cantidad = ?, producto_estado = ?
                WHERE producto_id = ?';
        $params = array($this->categoria_id, $this->marca_id, $this->descripcion, $this->nombre, $this->precio, $this->imagen, $this->cantidad, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readCategoria()
    {
        $sql = 'SELECT p.producto_id, c.categoria_nombre AS categoria, m.marca_nombre AS marca, p.*
                FROM tb_productos p
                JOIN tb_categorias c ON p.categoria_id = c.categoria_id
                JOIN tb_marcas m ON p.marca_id = m.marca_id
                WHERE c.categoria_nombre = ?;
                ';
        $params = array($this->nombre_categoria);
        return Database::getRows($sql, $params);
    }

    public function deleteRow()
    {
        $sql = "
            DELETE c
            FROM tb_comentarios c
            JOIN tb_detalles_pedidos dp ON c.detalle_pedido_id = dp.detalle_pedido_id
            WHERE dp.producto_id = ?;
            DELETE FROM tb_detalles_pedidos
            WHERE producto_id = ?;
            DELETE FROM tb_productos
            WHERE producto_id = ?;
        ";
        $params = array($this->id, $this->id, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT producto_imagen
                FROM tb_productos
                WHERE producto_id = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_productos SET producto_estado = NOT producto_estado WHERE producto_id=?;';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
