<?php

// Se incluyen los archivos necesarios para las clases Validator y CategoriaHandler.
require_once('../../helpers/validator.php');
require_once('../../models/handler/categoria_handler.php');

// Definición de la clase CategoriaData que extiende de CategoriaHandler.
class CategoriaData extends CategoriaHandler
{
    // Variable privada para almacenar mensajes de error.
    private $data_error = null;
    // Variable privada para almacenar el nombre de archivo (aparentemente no utilizada en este fragmento de código).
    private $filename = null;

    // Método para establecer el ID de la categoría.
    public function setId($value)
    {
        // Se valida que $value sea un número natural válido utilizando Validator::validateNaturalNumber.
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value; // Se asigna $value a la propiedad $id de la clase.
            return true; // Retorna true si la validación fue exitosa.
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto'; // Asigna un mensaje de error si la validación falla.
            return false; // Retorna false si la validación falla.
        }
    }

    // Método para establecer el nombre de la categoría.
    public function setNombre($value, $min = 2, $max = 50)
    {
        // Se verifica que $value sea alfanumérico utilizando Validator::validateAlphanumeric.
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico'; // Asigna un mensaje de error si $value no es alfanumérico.
            return false; // Retorna false si $value no es alfanumérico.
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value; // Se asigna $value a la propiedad $nombre de la clase.
            return true; // Retorna true si la validación fue exitosa.
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max; // Asigna un mensaje de error si la longitud de $value está fuera del rango especificado.
            return false; // Retorna false si la longitud de $value está fuera del rango especificado.
        }
    }

    // Método para establecer la descripción de la categoría.
    public function setDescripcion($value, $min = 2, $max = 250)
    {
        // Se verifica si $value está vacío o nulo.
        if (!$value) {
            return true; // Retorna true si $value está vacío o es nulo.
        } elseif (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos'; // Asigna un mensaje de error si $value contiene caracteres prohibidos.
            return false; // Retorna false si $value contiene caracteres prohibidos.
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value; // Se asigna $value a la propiedad $descripcion de la clase.
            return true; // Retorna true si la validación fue exitosa.
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max; // Asigna un mensaje de error si la longitud de $value está fuera del rango especificado.
            return false; // Retorna false si la longitud de $value está fuera del rango especificado.
        }
    }
    
    // Método para establecer el estado de la categoría.
    public function setEstado($value)
    {
        // Si $value es un booleano, lo transformamos en un número entero (0 o 1).
        if (is_bool($value)) {
            $this->estado = $value ? 1 : 0; // Asigna 1 si $value es true, o 0 si $value es false.
            return true; // Retorna true si la asignación fue exitosa.
        } elseif (is_numeric($value) && ($value == 0 || $value == 1)) {
            $this->estado = intval($value); // Convierte $value a entero y lo asigna a la propiedad $estado.
            return true; // Retorna true si la asignación fue exitosa.
        } else {
            $this->data_error = 'El estado debe ser un valor booleano o un número (0 o 1)'; // Asigna un mensaje de error si $value no es booleano ni un número válido.
            return false; // Retorna false si $value no es booleano ni un número válido.
        }
    }

    // Método para obtener el mensaje de error actual.
    public function getDataError()
    {
        return $this->data_error; // Retorna el mensaje de error almacenado en $data_error.
    }
}
