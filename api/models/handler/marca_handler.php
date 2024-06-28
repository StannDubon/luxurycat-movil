
<?php
require_once('../../helpers/database.php');

class MarcaHandler
{
    protected $marca_id = null;
    protected $marca_nombre = null;
    protected $marca_estado = null;

    /* BUSQUEDA */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_marcas where marca_nombre LIKE ?;';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    /* INSERTAR */
    public function createRow()
    {
        $sql = 'INSERT INTO tb_marcas(marca_nombre, marca_estado) VALUES(?, ?)';

        $params = array($this->marca_nombre, $this->marca_estado);
        return Database::executeRow($sql, $params);
    }

    /* LEER TABLA */
    public function readAll()
    {
        $sql = 'SELECT * FROM tb_marcas;';
        return Database::getRows($sql);
    }

    /* LEER ELEMENTO */
    public function readOne()
    {
        $sql = 'SELECT * FROM tb_marcas WHERE marca_id= ?';
        $params = array($this->marca_id);
        return Database::getRow($sql, $params);
    }

    /* ACTUALIZAR */
    public function updateRow()
    {
        $sql = 'UPDATE tb_marcas
                SET marca_nombre = ?, marca_estado = ?
                WHERE marca_id = ?';
        $params = array($this->marca_nombre, $this->marca_estado, $this->marca_id);
        return Database::executeRow($sql, $params);
    }

    /* ELIMINAR */
    public function deleteRow()
    {
        $sql = 'UPDATE tb_productos SET marca_id = NULL WHERE marca_id = ?;
                DELETE FROM tb_marcas WHERE marca_id = ?;';
        $params = array($this->marca_id, $this->marca_id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_marcas SET marca_estado = NOT marca_estado WHERE marca_id=?';
        $params = array($this->marca_id);
        return Database::executeRow($sql, $params);
    }
}
