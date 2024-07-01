<?php

require_once('../../models/data/cliente_data.php');

if (isset($_GET['action'])) {
    session_start();
    $cliente = new UsuarioData;
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    if (isset($_SESSION['admin_id'])) {
        $result['session'] = 1;
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $cliente->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['usuario_nombre']) or
                    !$cliente->setApellido($_POST['usuario_apellido']) or
                    !$cliente->setCorreo($_POST['usuario_correo']) or
                    !$cliente->setUsuario($_POST['usuario_usuario']) or
                    !$cliente->setContraseña($_POST['usuario_contraseña']) or
                    !$cliente->setEstado($_POST['usuario_estado'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['usuario_contraseña'] != $_POST['confirmar_contraseña']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el cliente';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $cliente->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen clientes registrados';
                }
                break;
            case 'readOne':
                if (!$cliente->setId($_POST['usuario_id'])) {
                    $result['error'] = 'Cliente incorrecto';
                } elseif ($result['dataset'] = $cliente->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cliente inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setId($_POST['usuario_id']) or
                    !$cliente->setNombre($_POST['usuario_nombre']) or
                    !$cliente->setApellido($_POST['usuario_apellido']) or
                    !$cliente->setCorreo($_POST['usuario_correo']) or
                    !$cliente->setUsuario($_POST['usuario_usuario']) or
                    !$cliente->setEstado($_POST['usuario_estado'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el cliente';
                }
                break;
            case 'deleteRow':
                if (!$cliente->setId($_POST['usuario_id'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cliente';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['usuario_usuario'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['usuario_usuario'];
                } else {
                    $result['error'] = 'Usuario de cliente indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $cliente->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['usuario_nombre']) or
                    !$cliente->setApellido($_POST['usuario_apellido']) or
                    !$cliente->setCorreo($_POST['usuario_correo']) or
                    !$cliente->setUsuario($_POST['usuario_usuario'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $_SESSION['usuario_usuario'] = $_POST['usuario_usuario'];
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkPassword($_POST['clave_actual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['clave_nueva'] != $_POST['confirmar_clave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$cliente->setContraseña($_POST['clave_nueva'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
                case 'changeStatus':
                    if (
                        !$cliente->setId($_POST['usuario_id'])
                    ) {
                        $result['error'] = $cliente->getDataError();
                    } elseif ($cliente->changeStatus()) {
                        $result['status'] = 1;
                        $result['message'] = 'Categoría cambiada correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al cambiar la categoría';
                    }
                    break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        switch ($_GET['action']) {
            case 'readUsers':
                if ($cliente->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['usuario_nombre']) or
                    !$cliente->setApellido($_POST['usuario_apellido']) or
                    !$cliente->setCorreo($_POST['usuario_correo']) or
                    !$cliente->setUsuario($_POST['usuario_usuario']) or
                    !$cliente->setContraseña($_POST['usuario_contraseña']) or
                    !$cliente->setEstado(1)
                    
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['usuario_contraseña'] != $_POST['confirmar_contraseña']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el administrador';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($cliente->checkUser($_POST['usuario_usuario'], $_POST['usuario_contraseña'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }

    $result['exception'] = Database::getException();
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
