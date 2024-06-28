<?php

require_once('../../helpers/validator.php');
require_once('../../models/handler/tipoadmin_handler.php');

class TipoadminData extends TipoadminHandler
{
    private $data_error = null;

    public function setTipoAdminId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->tipo_admin_id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del tipo de administrador es incorrecto';
            return false;
        }
    }

    public function setTipoAdminNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo_admin_nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function getDataError()
    {
        return $this->data_error;
    }
}

?>
