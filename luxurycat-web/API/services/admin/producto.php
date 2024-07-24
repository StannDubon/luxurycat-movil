<?php
// Se incluye la clase del modelo.
require_once('../../models/data/producto_data.php');

const POST_BUSQUEDA = 'search';
const POST_NOMBRE = 'producto_nombre';
const POST_DESCRIPCION = 'producto_descripcion';
const POST_PRECIO = 'producto_precio';
const POST_CATEGORIA = 'categoria_id';
const POST_CANTIDAD = 'producto_cantidad';
const POST_MARCA = 'marca_id';
const POST_ESTADO = 'producto_estado';
const POST_IMAGEN = 'producto_imagen';
const POST_ID = 'producto_id';

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $producto = new ProductoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['admin_id']) || true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST[POST_BUSQUEDA])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $producto->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$producto->setNombre($_POST[POST_NOMBRE]) or
                    !$producto->setDescripcion($_POST[POST_DESCRIPCION]) or
                    !$producto->setPrecio($_POST[POST_PRECIO]) or
                    !$producto->setCategoriaId($_POST[POST_CATEGORIA]) or
                    !$producto->setMarcaId($_POST[POST_MARCA]) or
                    !$producto->setEstado($_POST[POST_ESTADO]) or
                    !$producto->setImagen($_FILES[POST_IMAGEN]) or
                    !$producto->setCantidad($_POST[POST_CANTIDAD])
                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto creado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES[POST_IMAGEN], $producto::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el producto';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen productos registrados';
                }
                break;
            case 'readOne':
                if (!$producto->setId($_POST[POST_ID])) {
                    $result['error'] = $producto->getDataError();
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$producto->setId($_POST[POST_ID]) or
                    !$producto->setFilename() or
                    !$producto->setNombre($_POST[POST_NOMBRE]) or
                    !$producto->setDescripcion($_POST[POST_DESCRIPCION]) or
                    !$producto->setPrecio($_POST[POST_PRECIO]) or
                    !$producto->setCategoriaId($_POST[POST_CATEGORIA]) or
                    !$producto->setMarcaId($_POST[POST_MARCA]) or
                    !$producto->setEstado($_POST[POST_ESTADO]) or
                    !$producto->setImagen($_FILES[POST_IMAGEN], $producto->getFilename())
                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES[POST_IMAGEN], $producto::RUTA_IMAGEN, $producto->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el producto';
                }
                break;
            case 'deleteRow':
                if (
                    !$producto->setId($_POST[POST_ID]) or
                    !$producto->setFilename()
                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($producto::RUTA_IMAGEN, $producto->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el producto';
                }
                break;
                case 'changeStatus':
                    if (
                        !$producto->setId($_POST[POST_ID])
                    ) {
                        $result['error'] = $producto->getDataError();
                    } elseif ($producto->changeStatus()) {
                        $result['status'] = 1;
                        $result['message'] = 'Categoría cambiada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al cambiar la categoría';
                    }
                    break;
                    case 'cantidadProductosCategoria':
                        if ($result['dataset'] = $producto->cantidadProductosCategoria()) {
                            $result['status'] = 1;
                        } else {
                            $result['error'] = 'No hay datos disponibles';
                        }
                        break;
                        case 'porcentajeProductosCategoria':
                        if ($result['dataset'] = $producto->porcentajeProductosCategoria()) {
                            $result['status'] = 1;
                        } else {
                            $result['error'] = 'No hay datos disponibles';
                        }
                        break; 
                        case 'cantidadProductosMarca':
                            if ($result['dataset'] = $producto->cantidadProductosMarca()) {
                                $result['status'] = 1;
                            } else {
                                $result['error'] = 'No hay datos disponibles';
                            }
                        break;
                        case 'porcentajeProductosMarca':
                            if ($result['dataset'] = $producto->porcentajeProductosMarca()) {
                                $result['status'] = 1;
                            } else {
                                $result['error'] = 'No hay datos disponibles';
                            }
                        break;      
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
