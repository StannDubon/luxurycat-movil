<?php

require_once('../../models/data/categoria_data.php');

const POST_BUSQUEDA = 'search';
const POST_NOMBRE = 'categoria_nombre';
const POST_DESCRIPCION = 'categoria_descripcion';
const POST_ESTADO = 'categoria_estado';
const POST_ID = 'categoria_id';

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categoria = new CategoriaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['admin_id'])) {

        

        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST[POST_BUSQUEDA])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $categoria->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoria->setNombre($_POST[POST_NOMBRE]) or
                    !$categoria->setDescripcion($_POST[POST_DESCRIPCION]) or
                    !$categoria->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $categoria->getDataError();
                } elseif ($categoria->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la categoría';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $categoria->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorías registradas';
                }
                break;
            case 'readOne':
                if (!$categoria->setId($_POST[POST_ID])) {
                    $result['error'] = $categoria->getDataError();
                } elseif ($result['dataset'] = $categoria->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Categoría inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoria->setId($_POST[POST_ID]) or
                    !$categoria->setNombre($_POST[POST_NOMBRE]) or
                    !$categoria->setDescripcion($_POST[POST_DESCRIPCION]) or
                    !$categoria->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $categoria->getDataError();
                } elseif ($categoria->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la categoría';
                }
                break;
            case 'deleteRow':
                if (
                    !$categoria->setId($_POST[POST_ID])
                ) {
                    $result['error'] = $categoria->getDataError();
                } elseif ($categoria->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría eliminada correctamente';
                    } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la categoría';
                }
                break;
                case 'changeStatus':
                    if (
                        !$categoria->setId($_POST[POST_ID])
                    ) {
                        $result['error'] = $categoria->getDataError();
                    } elseif ($categoria->changeStatus()) {
                        $result['status'] = 1;
                        $result['message'] = 'Categoría cambiada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al cambiar la categoría';
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
