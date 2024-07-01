<?php
require_once('../../helpers/database.php');
class CategoriaHandler
{
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $estado = null;

    const RUTA_IMAGEN = '../../images/categorias/';

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT categoria_id, categoria_nombre, categoria_descripcion, categoria_estado
                FROM tb_categorias
                WHERE categoria_nombre LIKE ? OR categoria_descripcion LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_categorias(categoria_nombre, categoria_descripcion, categoria_estado)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT categoria_id, categoria_nombre, categoria_descripcion, categoria_estado
                FROM tb_categorias';
        return Database::getRows($sql);
    }

    public function readCategoryWithProduct()
    {
        $sql = 'SELECT DISTINCT c.*
                FROM tb_categorias c
                JOIN tb_productos p ON c.categoria_id = p.categoria_id
                WHERE c.categoria_estado = 1;';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT categoria_id, categoria_nombre, categoria_descripcion, categoria_estado
                FROM tb_categorias
                WHERE categoria_id = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_categorias
                SET categoria_nombre = ?, categoria_descripcion = ?, categoria_estado = ?
                WHERE categoria_id = ?';
        $params = array($this->nombre, $this->descripcion, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = "
        UPDATE tb_productos SET categoria_id = NULL WHERE categoria_id = ?;
        DELETE FROM tb_categorias WHERE categoria_id = ?;";
        $params = array($this->id, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_categorias SET categoria_estado = NOT categoria_estado WHERE categoria_id=?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
