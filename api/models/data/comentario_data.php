<?php

require_once('../../helpers/validator.php');
require_once('../../models/handler/comentario_handler.php');

class ComentarioData extends ComentarioHandler
{
    private $data_error = null;

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
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setDescripcion($value, $min = 0, $max = 255)
    {
        // Puedes ajustar los límites mínimos y máximos según tus necesidades.
        if (Validator::validateAlphanumeric($value)) {
            $this->descripcion = $value;
            return true;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setEstado($value)
    {
        if (is_bool($value)) {
            $this->estado = $value ? 1 : 0;
            return true;
        } elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->estado = intval($value); // Convertimos a entero por seguridad.
            return true;
        } else {
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->data_error;
    }
}
?>
