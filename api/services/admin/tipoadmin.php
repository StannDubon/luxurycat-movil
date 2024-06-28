<?php

require_once('../../models/data/tipoadmin_data.php');

if (isset($_GET['action'])) {
    session_start();
    $tipo_administrador = new TipoadminData;
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    if (isset($_SESSION['admin_id'])) {
        $result['session'] = 1;
        switch ($_GET['action']) {

            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $tipo_administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$tipo_administrador->setTipoAdminNombre($_POST['tipo_admin_nombre'])
                ) {
                    $result['error'] = $tipo_administrador->getDataError();
                } elseif ($tipo_administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo administrador creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el administrador';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $tipo_administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen tipos de administradores registrados';
                }
                break;
            case 'readOne':
                if (!$tipo_administrador->setTipoAdminId($_POST['tipo_admin_id'])) {
                    $result['error'] = 'Administrador incorrecto';
                } elseif ($result['dataset'] = $tipo_administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Tipo aministrador inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$tipo_administrador->setTipoAdminId($_POST['tipo_admin_id']) or
                    !$tipo_administrador->setTipoAdminNombre($_POST['tipo_admin_nombre'])
                ) {
                    $result['error'] = $tipo_administrador->getDataError();
                } elseif ($tipo_administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Tipo administrador modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el tipo administrador';
                }
                break;
            case 'deleteRow':
                if (!$tipo_administrador->setTipoAdminId($_POST['tipo_admin_id'])) {
                    $result['error'] = $tipo_administrador->getDataError();
                } elseif ($tipo_administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el administrador';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    }
    $result['exception'] = Database::getException();
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
