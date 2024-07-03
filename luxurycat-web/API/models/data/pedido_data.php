<?php

// Incluimos los archivos necesarios
require_once('../../helpers/validator.php');
require_once('../../models/handler/pedido_handler.php');

// Definimos la clase PedidoData que extiende de PedidoHandler
class PedidoData extends PedidoHandler
{
    // Variable privada para almacenar errores de validación
    private $data_error = null;

    // Método para establecer el ID del pedido
    public function setId($value)
    {
        // Validamos que el valor sea un número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El identificador del pedido es incorrecto'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer el ID del detalle de pedido
    public function setIdDetalle($value)
    {
        // Validamos que el valor sea un número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->detalle_pedido_id = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El identificador del detalle pedido es incorrecto'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer el ID del cliente
    public function setCliente($value)
    {
        // Validamos que el valor sea un número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->cliente = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El identificador del cliente es incorrecto'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer el ID del producto
    public function setProducto($value)
    {
        // Validamos que el valor sea un número natural
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'El identificador del producto es incorrecto'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer la cantidad del detalle de pedido
    public function setCantidad($value)
    {
        // Validamos que el valor sea un número natural mayor o igual a 1
        if (Validator::validateNaturalNumber($value)) {
            $this->detalle_cantidad = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'La cantidad del producto debe ser mayor o igual a 1'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para establecer la dirección del cliente
    public function setDireccion($value, $min = 2, $max = 250)
    {
        // Validamos que la dirección sea alfanumérica y tenga una longitud válida
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'La direccion debe ser un valor alfanumerico'; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->direccion = $value; // Asignamos el valor si la validación es correcta
            return true; // Retornamos true indicando que se asignó correctamente
        } else {
            $this->data_error = 'La derrecion debe tener una longitud entre ' . $min . ' y ' . $max; // Guardamos el mensaje de error
            return false; // Retornamos false indicando que hubo un error
        }
    }

    // Método para obtener el mensaje de error actual
    public function getDataError()
    {
        return $this->data_error; // Retornamos el mensaje de error
    }
}


