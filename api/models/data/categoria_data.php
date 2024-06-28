<?php
require_once('../../helpers/validator.php');
require_once('../../models/handler/categoria_handler.php');

class CategoriaData extends CategoriaHandler
{
 
    private $data_error = null;
    private $filename = null;

   
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto';
            return false;
        }
    }

    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setDescripcion($value, $min = 2, $max = 250)
    {
        if (!$value) {
            return true;
        } elseif (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    
    // Método para establecer el estado de la marca.
    public function setEstado($value)
    {
        // Si $value es un booleano, lo transformamos en un número entero (0 o 1).
        if (is_bool($value)) {
            $this->estado = $value ? 1 : 0;
            return true;
        } 
        // Si $value es un número, verificamos que esté en el rango permitido (0 o 1).
        elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->estado = intval($value); // Convertimos a entero por seguridad.
            return true;
        } 
        // Si no es un booleano ni un número válido, retornamos false indicando error.
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
