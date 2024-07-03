<?php

// Requiere el archivo de validación para asegurar que las funciones de validación estén disponibles.
require_once('../../helpers/validator.php');

// Requiere el manejador de administrador para extender su funcionalidad.
require_once('../../models/handler/administrador_handler.php');

// Definición de la clase AdministradorData, la cual extiende de AdministradorHandler
class AdministradorData extends AdministradorHandler
{
    // Variable privada para almacenar errores de datos
    private $data_error = null;

    // Método para establecer el ID del administrador
    public function setId($value)
    {
        // Validación de que el valor es un número natural válido
        if (Validator::validateNaturalNumber($value)) {
            // Asigna el valor del ID del administrador
            $this->admin_id = $value;
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error si el valor no es válido
            $this->data_error = 'El identificador del administrador es incorrecto';
            return false; // Retorna falso si hay un error
        }
    }

    // Método para establecer el nombre del administrador
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Validación de que el valor es alfabético
        if (!Validator::validateAlphabetic($value)) {
            // Almacena el error si el nombre no es alfabético
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false; // Retorna falso si hay un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Asigna el valor del nombre del administrador si la longitud es válida
            $this->admin_nombre = $value;
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error si la longitud del nombre no es válida
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false; // Retorna falso si hay un error
        }
    }

    // Método para establecer el apellido del administrador (similar a setNombre)
    public function setApellido($value, $min = 2, $max = 50)
    {
        // Validación de que el valor es alfabético
        if (!Validator::validateAlphabetic($value)) {
            // Almacena el error si el apellido no es alfabético
            $this->data_error = 'El apellido debe ser un valor alfabético';
            return false; // Retorna falso si hay un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Asigna el valor del apellido del administrador si la longitud es válida
            $this->admin_apellido = $value;
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error si la longitud del apellido no es válida
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false; // Retorna falso si hay un error
        }
    }

    // Método para establecer el correo electrónico del administrador
    public function setCorreo($value, $min = 8, $max = 100)
    {
        // Validación de que el valor es un correo electrónico válido
        if (!Validator::validateEmail($value)) {
            // Almacena el error si el correo electrónico no es válido
            $this->data_error = 'El correo no es válido';
            return false; // Retorna falso si hay un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Asigna el valor del correo electrónico del administrador si la longitud es válida
            $this->admin_correo = $value;
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error si la longitud del correo electrónico no es válida
            $this->data_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false; // Retorna falso si hay un error
        }
    }

    // Método para establecer el nombre de usuario del administrador
    public function setUsuario($value, $min = 6, $max = 25)
    {
        // Validación de que el valor es alfanumérico
        if (!Validator::validateAlphanumeric($value)) {
            // Almacena el error si el nombre de usuario no es alfanumérico
            $this->data_error = 'El usuario debe ser un valor alfanumérico';
            return false; // Retorna falso si hay un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            // Asigna el valor del nombre de usuario del administrador si la longitud es válida
            $this->admin_usuario = $value;
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error si la longitud del nombre de usuario no es válida
            $this->data_error = 'El usuario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false; // Retorna falso si hay un error
        }
    }

    // Método para establecer la contraseña del administrador
    public function setContraseña($value)
    {
        // Validación de que la contraseña es válida según criterios de validación
        if (Validator::validatePassword($value)) {
            // Encripta y asigna la contraseña utilizando hash
            $this->admin_contraseña = password_hash($value, PASSWORD_DEFAULT);
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error relacionado con la validación de contraseña
            $this->data_error = Validator::getPasswordError();
            return false; // Retorna falso si hay un error
        }
    }

    // Método para establecer el estado del administrador (activo o inactivo)
    public function setEstado($value)
    {
        // Verifica si el valor es booleano
        if (is_bool($value)) {
            // Convierte el booleano a entero y asigna el estado del administrador
            $this->admin_estado = $value ? 1 : 0;
            return true; // Retorna verdadero si se establece correctamente
        } elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            // Verifica si el valor numérico es 0 o 1 y lo convierte a entero
            $this->admin_estado = intval($value); // Convertimos a entero por seguridad.
            return true; // Retorna verdadero si se establece correctamente
        } else {
            // Almacena el error si el valor no es booleano ni numérico válido
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)';
            return false; // Retorna falso si hay un error
        }
    }

    // Método para obtener el mensaje de error de datos
    public function getDataError()
    {
        return $this->data_error; // Retorna el mensaje de error actual
    }
}

