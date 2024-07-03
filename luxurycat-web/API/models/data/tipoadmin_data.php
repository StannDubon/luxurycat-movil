<?php

// Incluimos los archivos necesarios
require_once('../../helpers/validator.php');
require_once('../../models/handler/tipoadmin_handler.php');

// Definimos la clase TipoadminData que extiende de TipoadminHandler
class TipoadminData extends TipoadminHandler
{
    // Variable privada para almacenar errores de validación
    private $data_error = null;

    // Método para establecer el ID del tipo de administrador
    public function setTipoAdminId($value)
    {
        // Validamos que el valor sea un número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->tipo_admin_id = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El identificador del tipo de administrador es incorrecto'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer el nombre del tipo de administrador
    public function setTipoAdminNombre($value, $min = 2, $max = 50)
    {
        // Validamos que el valor sea alfabético y tenga una longitud válida
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo_admin_nombre = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para obtener el mensaje de error actual
    public function getDataError()
    {
        return $this->data_error; // Retornamos el mensaje de error
    }
}

?>
