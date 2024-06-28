<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');

// Se incluye la clase padre.
require_once('../../models/handler/marca_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla USUARIO.
*/
class MarcaData extends MarcaHandler
{
    private $data_error = null;

    // Método para establecer el identificador de la marca.
    public function setId($value)
    {
        // Validación del identificador como número natural.
        if (Validator::validateNaturalNumber($value)) {
            $this->marca_id = $value;
            return true;
        } else {
            // Si la validación falla, se establece un mensaje de error.
            $this->data_error = 'El identificador de la marca es incorrecto';
            return false;
        }
    }

    // Método para establecer el nombre de la marca.
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Validación del nombre como texto alfabético y longitud dentro de un rango dado.
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre de la marca debe ser alfabético';
            return false;
        } elseif (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'El nombre de la marca debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        } else {
            // Si la validación es exitosa, se asigna el nombre.
            $this->marca_nombre = $value;
            return true;
        }
    }

    // Método para establecer el estado de la marca.
    public function setEstado($value)
    {
        // Si $value es un booleano, lo transformamos en un número entero (0 o 1).
        if (is_bool($value)) {
            $this->marca_estado = $value ? 1 : 0;
            return true;
        } 
        // Si $value es un número, verificamos que esté en el rango permitido (0 o 1).
        elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->marca_estado = intval($value); // Convertimos a entero por seguridad.
            return true;
        } 
        // Si no es un booleano ni un número válido, retornamos false indicando error.
        else {
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)';
            return false;
        }
    }

    // Método para obtener el mensaje de error generado durante la validación de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}
