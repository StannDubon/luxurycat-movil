<?php

require_once('../../helpers/validator.php');
require_once('../../models/handler/cliente_handler.php');

class UsuarioData extends UsuarioHandler
{
    private $data_error = null;

    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->usuario_id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del administrador es incorrecto';
            return false;
        }
    }

    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->usuario_nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setApellido($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El apellido debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->usuario_apellido = $value;
            return true;
        } else {
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCorreo($value, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'El correo no es válido';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->usuario_correo = $value;
            return true;
        } else {
            $this->data_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setUsuario($value, $min = 6, $max = 25)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El usuario debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->usuario_usuario = $value;
            return true;
        } else {
            $this->data_error = 'El usuario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setContraseña($value)
    {
        if (Validator::validatePassword($value)) {
            $this->usuario_contraseña = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    public function setEstado($value)
    {
        if (is_bool($value)) {
            $this->usuario_estado = $value ? 1 : 0;
            return true;
        } 
        elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->usuario_estado = intval($value); // Convertimos a entero por seguridad.
            return true;
        } 
        else {
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->data_error;
    }
}
