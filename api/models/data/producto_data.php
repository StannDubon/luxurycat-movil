<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/producto_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla PRODUCTO.
 */
class ProductoData extends ProductoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    // Métodos para validar y establecer el ID
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    // Métodos para validar y establecer el ID de la categoría
    public function setCategoriaId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->categoria_id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto';
            return false;
        }
    }

    // Métodos para validar y establecer el ID de la marca
    public function setMarcaId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->marca_id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la marca es incorrecto';
            return false;
        }
    }

    // Métodos para validar y establecer la descripción
    public function setDescripcion($value, $min = 2, $max = 250)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos';
            return false;
        } elseif (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        } else {
            $this->descripcion = $value;
            return true;
        }
    }

    // Métodos para validar y establecer el nombre
    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        } else {
            $this->nombre = $value;
            return true;
        }
    }

    // Métodos para validar y establecer el nombre
    public function setNombreCategoria($value, $min = 2, $max = 50)
    {
        if (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        } else {
            $this->nombre_categoria = $value;
            return true;
        }
    }

    // Métodos para validar y establecer el precio
    public function setPrecio($value)
    {
        if (!Validator::validateMoney($value)) {
            $this->data_error = 'El precio no tiene un formato válido';
            return false;
        } else {
            $this->precio = $value;
            return true;
        }
    }

    // Métodos para validar y establecer la imagen
    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFileSimple($file)) {
            $this->imagen = Validator::getFileName();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }

    // Métodos para validar y establecer la cantidad
    public function setCantidad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad debe ser un número entero mayor o igual a uno';
            return false;
        }
    }

    // Métodos para validar y establecer el estado
    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El estado debe ser un valor booleano (0 o 1)';
            return false;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['producto_imagen'];
            return true;
        } else {
            $this->data_error = 'Producto inexistente';
            return false;
        }
    }
    
    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
