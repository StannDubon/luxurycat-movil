<?php

require_once('../../helpers/email.php');
require_once('../../helpers/database.php');

class UsuarioHandler {

    protected $usuario_id = null;
    protected $usuario_nombre = null;
    protected $usuario_apellido = null;
    protected $usuario_usuario = null;
    protected $usuario_contraseña = null;
    protected $usuario_correo = null;
    protected $usuario_estado = null;

    public function checkUser($user, $password)
    {
        $sql = 'SELECT usuario_id, usuario_usuario, usuario_contraseña, usuario_correo, usuario_estado
                FROM tb_usuarios
                WHERE usuario_usuario = ?';
        $params = array($user);
        $data = Database::getRow($sql, $params);
        if ($data) {
            if (password_verify($password, $data['usuario_contraseña'])) {
                $_SESSION['usuario_id'] = $data['usuario_id'];
                $_SESSION['usuario_correo'] = $data['usuario_correo'];
                $this->usuario_id = $data['usuario_id'];
                $this->usuario_estado = $data['usuario_estado'];
                $this->usuario_usuario = $data['usuario_usuario'];
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    

    public function checkPassword($password)
    {
        $sql = 'SELECT usuario_contraseña
                FROM tb_usuarios
                WHERE usuario_id = ?';
        $params = array($_SESSION['usuario_id']);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['usuario_contraseña'])) {
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus()
    {
        if ($this->usuario_estado) {
            $_SESSION['usuario_id'] = $this->usuario_id;
            $_SESSION['usuario_usuario'] = $this->usuario_usuario;
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_usuarios
                SET usuario_contraseña = ?
                WHERE usuario_id = ?';
        $params = array($this->usuario_contraseña, $_SESSION['usuario_id']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_correo, usuario_usuario, usuario_estado
                FROM tb_usuarios
                WHERE usuario_id = ?';
        $params = array($_SESSION['usuario_id']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_usuarios
                SET usuario_nombre = ?, usuario_apellido = ?, usuario_correo = ?, usuario_usuario = ?, usuario_estado = true
                WHERE usuario_id = ?';
        $params = array($this->usuario_nombre, $this->usuario_apellido, $this->usuario_correo, $this->usuario_usuario, $_SESSION['usuario_id']);
        return Database::executeRow($sql, $params);
    }

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = "SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_correo, usuario_usuario, usuario_estado
                FROM tb_usuarios
                WHERE usuario_apellido LIKE ? OR usuario_nombre LIKE ? OR usuario_correo LIKE ? OR usuario_usuario LIKE ?";
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_usuarios(usuario_nombre, usuario_apellido, usuario_correo, usuario_usuario, usuario_contraseña, usuario_estado)
                VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->usuario_nombre, $this->usuario_apellido, $this->usuario_correo, $this->usuario_usuario, $this->usuario_contraseña, $this->usuario_estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_correo, usuario_usuario, usuario_estado
                FROM tb_usuarios';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_correo, usuario_usuario, usuario_estado
                FROM tb_usuarios
                WHERE usuario_id = ?';
        $params = array($this->usuario_id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_usuarios
                SET usuario_nombre = ?, usuario_apellido = ?, usuario_correo = ?, usuario_usuario = ?, usuario_estado = ?
                WHERE usuario_id = ?';
        $params = array($this->usuario_nombre, $this->usuario_apellido, $this->usuario_correo, $this->usuario_usuario, $this->usuario_estado, $this->usuario_id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_usuarios
                WHERE usuario_id = ?';
        $params = array($this->usuario_id);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_usuarios SET usuario_estado = NOT usuario_estado WHERE usuario_id=?';
        $params = array($this->usuario_id);
        return Database::executeRow($sql, $params);
    }

    // FUNCIONES PARA EL CAMBIO DE CONTRASEÑA POR EMAIL

    public function changePasswordFromEmail()
    {
        $sql = 'UPDATE tb_usuarios SET usuario_contraseña = ? WHERE usuario_correo = ?';
        $params = array($this->usuario_contraseña, $this->usuario_correo);
        return Database::executeRow($sql, $params);
    }

    public function verifyExistingEmail()
    {
        $sql = 'SELECT COUNT(*) as count
                FROM tb_usuarios
                WHERE usuario_correo = ?';
        $params = array($this->usuario_correo);
        $result = Database::getRow($sql, $params);
    
        if ($result['count'] > 0) {
            return true; // Hay resultados
        } else {
            return false; // No hay resultados
        }
    }
}
