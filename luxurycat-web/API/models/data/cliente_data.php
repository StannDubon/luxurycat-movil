<?php

// Se incluyen los archivos necesarios
require_once('../../helpers/validator.php');
require_once('../../models/handler/cliente_handler.php');

// Definición de la clase UsuarioData que extiende de UsuarioHandler
class UsuarioData extends UsuarioHandler
{
    // Variable privada para almacenar errores de datos
    private $data_error = null;

    // Método para establecer el ID del usuario
    public function setId($value)
    {
        // Validación del ID como número natural usando Validator
        if (Validator::validateNaturalNumber($value)) {
            $this->usuario_id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del administrador es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre del usuario
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Validación del nombre como valor alfabético y longitud usando Validator
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

    // Método para establecer el apellido del usuario
    public function setApellido($value, $min = 2, $max = 50)
    {
        // Validación del apellido como valor alfabético y longitud usando Validator
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

    // Método para establecer el correo del usuario
    public function setCorreo($value, $min = 8, $max = 100)
    {
        // Validación del correo como dirección válida y longitud usando Validator
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

    // Método para establecer el nombre de usuario
    public function setUsuario($value, $min = 6, $max = 25)
    {
        // Validación del usuario como valor alfanumérico y longitud usando Validator
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

    // Método para establecer la contraseña del usuario
    public function setContraseña($value)
    {
        // Validación de la contraseña usando Validator y almacenamiento en hash
        if (Validator::validatePassword($value)) {
            $this->usuario_contraseña = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    // Método para establecer el estado del usuario
    public function setEstado($value)
    {
        // Validación del estado como booleano o número 0 o 1
        if (is_bool($value)) {
            $this->usuario_estado = $value ? 1 : 0;
            return true;
        } elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->usuario_estado = intval($value); // Convertimos a entero por seguridad.
            return true;
        } else {
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)';
            return false;
        }
    }

    // Método para obtener el error de datos
    public function getDataError()
    {
        return $this->data_error;
    }
}
