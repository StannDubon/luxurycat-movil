<?php	

require_once('../../helpers/database.php');

class TipoadminHandler{

    protected $tipo_admin_id = null;
    protected $tipo_admin_nombre = null;


    public function searchRows(){
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM tb_tipos_admin
                WHERE tipo_admin_id LIKE ?
                OR tipo_admin_nombre LIKE ?
                ORDER BY tipo_admin_nombre';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow(){
        $sql = 'INSERT INTO tb_tipos_admin(tipo_admin_nombre)
                VALUES(?)';
        $params = array($this->tipo_admin_nombre);
        return Database::executeRow($sql, $params);
    }

    public function readAll(){
        $sql = 'SELECT * FROM tb_tipos_admin
                ORDER BY tipo_admin_nombre';
        return Database::getRows($sql);
    }

    public function readOne(){
        $sql = 'SELECT * FROM tb_tipos_admin
                WHERE tipo_admin_id = ?';
        $params = array($this->tipo_admin_id);
        return Database::getRow($sql, $params);
    }

    public function updateRow(){
        $sql = 'UPDATE tb_tipos_admin
                SET tipo_admin_nombre = ?
                WHERE tipo_admin_id = ?;';
        $params = array($this->tipo_admin_nombre, $this->tipo_admin_id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow(){
        $sql = 'DELETE FROM tb_tipos_admin
                WHERE tipo_admin_id = ?';
        $params = array($this->tipo_admin_id);
        return Database::executeRow($sql, $params);
    }

}