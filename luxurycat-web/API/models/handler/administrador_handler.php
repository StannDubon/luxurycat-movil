<?php

require_once('../../helpers/database.php');

class AdministradorHandler {

    protected $admin_id = null;
    protected $admin_nombre = null;
    protected $admin_apellido = null;
    protected $admin_usuario = null;
    protected $admin_contraseña = null;
    protected $admin_correo = null;
    protected $admin_estado = null;

    public function checkUser($username, $password)
    {
        $sql = 'SELECT admin_id, admin_usuario, admin_contraseña
                FROM tb_administradores
                WHERE admin_usuario = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['admin_contraseña'])) {
            $_SESSION['admin_id'] = $data['admin_id'];
            $_SESSION['admin_usuario'] = $data['admin_usuario'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT admin_contraseña
                FROM tb_administradores
                WHERE admin_id = ?';
        $params = array($_SESSION['admin_id']);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['admin_contraseña'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores
                SET admin_contraseña = ?
                WHERE admin_id = ?';
        $params = array($this->admin_contraseña, $_SESSION['admin_id']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT admin_id, admin_nombre, admin_apellido, admin_correo, admin_usuario, admin_estado
                FROM tb_administradores
                WHERE admin_id = ?';
        $params = array($_SESSION['admin_id']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET admin_nombre = ?, admin_apellido = ?, admin_correo = ?, admin_usuario = ?, admin_estado = ?
                WHERE admin_id = ?';
        $params = array($this->admin_nombre, $this->admin_apellido, $this->admin_correo, $this->admin_usuario, $this->admin_estado, $_SESSION['admin_id']);
        return Database::executeRow($sql, $params);
    }

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT admin_id, admin_nombre, admin_apellido, admin_correo, admin_usuario, admin_estado
                FROM tb_administradores
                WHERE admin_apellido LIKE ? OR admin_nombre LIKE ? OR admin_correo LIKE ? OR admin_usuario LIKE ? OR admin_estado LIKE ?';
        $params = array($value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_administradores(admin_nombre, admin_apellido, admin_correo, admin_usuario, admin_contraseña, admin_estado)
                VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->admin_nombre, $this->admin_apellido, $this->admin_correo, $this->admin_usuario, $this->admin_contraseña, $this->admin_estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT admin_id, admin_nombre, admin_apellido, admin_correo, admin_usuario, admin_estado
                FROM tb_administradores';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT admin_id, admin_nombre, admin_apellido, admin_correo, admin_usuario, admin_estado
                FROM tb_administradores
                WHERE admin_id = ?';
        $params = array($this->admin_id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET admin_nombre = ?, admin_apellido = ?, admin_correo = ?, admin_usuario = ?, admin_estado = ?
                WHERE admin_id = ?';
        $params = array($this->admin_nombre, $this->admin_apellido, $this->admin_correo, $this->admin_usuario, $this->admin_estado, $this->admin_id);
        return Database::executeRow($sql, $params);
    }

    public function updateRowPassword()
    {
        $sql = 'UPDATE tb_administradores
                SET admin_nombre = ?, admin_apellido = ?, admin_correo = ?, admin_usuario = ?, admin_estado = ?, admin_contraseña = ?
                WHERE admin_id = ?';
        $params = array($this->admin_nombre, $this->admin_apellido, $this->admin_correo, $this->admin_usuario, $this->admin_estado, $this->admin_contraseña, $this->admin_id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administradores
                WHERE admin_id = ?';
        $params = array($this->admin_id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_administradores SET admin_estado = NOT admin_estado WHERE admin_id=?';
        $params = array($this->admin_id);
        return Database::executeRow($sql, $params);
    }
}