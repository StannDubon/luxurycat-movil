<?php

require_once('../../models/data/comentario_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $comentario = new ComentarioData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['admin_id'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $comentario->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $comentario->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen comentarios registrados';
                }
                break;
            case 'readOne':
                if (!$comentario->setId($_POST['idComentario'])) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($result['dataset'] = $comentario->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Comentario inexistente';
                }
                break;
            case 'deleteRow':
                if (
                    !$comentario->setId($_POST['idComentario'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario eliminado correctamente';
                    } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el comentario';
                }
                break;
            case 'changeStatus':
                if (
                    !$comentario->setId($_POST['idComentario'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->changeStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar el comentario';
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
