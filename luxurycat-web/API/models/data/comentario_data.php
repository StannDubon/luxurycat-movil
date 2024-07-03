<?php

// Incluimos los archivos necesarios
require_once('../../helpers/validator.php');
require_once('../../models/handler/comentario_handler.php');

// Definimos la clase ComentarioData que extiende de ComentarioHandler
class ComentarioData extends ComentarioHandler
{
    // Variable privada para almacenar errores de validación
    private $data_error = null;

    // Método para establecer el ID del comentario
    public function setId($value)
    {
        // Validamos que el valor sea un número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer el nombre del comentario
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Validamos que el valor sea alfabético
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer la descripción del comentario
    public function setDescripcion($value, $min = 0, $max = 255)
    {
        // Validamos que el valor sea alfanumérico o tenga una longitud válida
        if (Validator::validateAlphanumeric($value)) {
            $this->descripcion = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer el estado del comentario
    public function setEstado($value)
    {
        // Validamos que el valor sea un booleano o un número 0 o 1
        if (is_bool($value)) {
            $this->estado = $value ? 1 : 0; // Asignamos 1 si es true y 0 si es false
            return true; // Retornamos true indicando que se asignó correctamente
        } elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->estado = intval($value); // Convertimos a entero por seguridad y asignamos el valor
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para obtener el mensaje de error actual
    public function getDataError()
    {
        return $this->data_error; // Retornamos el mensaje de error
    }
}

