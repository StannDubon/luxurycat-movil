<?php

// Incluimos el archivo que contiene la clase AdministradorData
require_once('../../models/data/administrador_data.php');

// Definimos constantes para los nombres de los campos POST
const POST_SEARCH = 'search';
const POST_ID = 'admin_id';
const POST_NOMBRE = 'admin_nombre';
const POST_APELLIDO = 'admin_apellido';
const POST_CORREO = 'admin_correo';
const POST_USUARIO = 'admin_usuario';
const POST_CONTRASEÑA = 'admin_contraseña';
const POST_CONFIRMAR_CONTRASEÑA = 'confirmar_contraseña';
const POST_ESTADO = 'admin_estado';

// Verificamos si se ha enviado el parámetro 'action' por GET
if (isset($_GET['action'])) {
    session_start(); // Iniciamos la sesión

    // Creamos una instancia de la clase AdministradorData
    $administrador = new AdministradorData;
    
    // Inicializamos el arreglo $result con valores por defecto
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    // Verificamos si existe una sesión activa
    if (isset($_SESSION['admin_id'])) {
        $result['session'] = 1; // Marcamos que hay sesión activa

        // Procesamos la acción según el valor de 'action' enviado por GET
        switch ($_GET['action']) {
            case 'searchRows':
                // Validamos el campo POST 'search'
                if (!Validator::validateSearch($_POST[POST_SEARCH])) {
                    $result['error'] = Validator::getSearchError(); // Guardamos el error de validación
                } elseif ($result['dataset'] = $administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Validamos cada campo del formulario
                if (
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setUsuario($_POST[POST_USUARIO]) or
                    !$administrador->setContraseña($_POST[POST_CONTRASEÑA]) or
                    !$administrador->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($_POST[POST_CONTRASEÑA] != $_POST[POST_CONFIRMAR_CONTRASEÑA]) {
                    $result['error'] = 'Contraseñas diferentes'; // Error si las contraseñas no coinciden
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el administrador';
                }
                break;
            case 'readAll':
                // Obtenemos todos los registros de administradores
                if ($result['dataset'] = $administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen administradores registrados';
                }
                break;
            case 'readOne':
                // Leemos un administrador específico según el ID enviado por POST
                if (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = 'Administrador incorrecto';
                } elseif ($result['dataset'] = $administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Administrador inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Validamos cada campo del formulario
                if (
                    !$administrador->setId($_POST[POST_ID]) or
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setUsuario($_POST[POST_USUARIO]) or
                    !$administrador->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el administrador';
                }
                break;
            case 'updateRowPassword':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Validamos cada campo del formulario
                if (
                    !$administrador->setId($_POST[POST_ID]) or
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setUsuario($_POST[POST_USUARIO]) or
                    !$administrador->setContraseña($_POST[POST_CONTRASEÑA]) or
                    !$administrador->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($_POST[POST_CONTRASEÑA] != $_POST[POST_CONFIRMAR_CONTRASEÑA]) {
                    $result['error'] = 'Contraseñas diferentes'; // Error si las contraseñas no coinciden
                } elseif ($administrador->updateRowPassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el administrador';
                }
                break;
            case 'deleteRow':
                // Eliminamos un administrador según el ID enviado por POST
                if ($_POST['admin_id'] == $_SESSION[POST_ID]) {
                    $result['error'] = 'No se puede eliminar a sí mismo';
                } elseif (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el administrador';
                }
                break;
            case 'getUser':
                // Obtenemos el nombre de usuario del administrador de la sesión actual
                if (isset($_SESSION["admin_id"])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION["admin_usuario"];
                } else {
                    $result['error'] = 'Usuario de administrador indefinido';
                }
                break;
            case 'logOut':
                // Cerramos la sesión actual
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                // Leemos el perfil del administrador de la sesión actual
                if ($result['dataset'] = $administrador->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Validamos cada campo del formulario
                if (
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setUsuario($_POST[POST_USUARIO])
                ) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($administrador->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $_SESSION[POST_USUARIO] = $_POST[POST_USUARIO]; // Actualizamos el nombre de usuario en la sesión
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Validamos la contraseña actual y la nueva contraseña
                if (!$administrador->checkPassword($_POST['clave_actual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['clave_nueva'] != $_POST['confirmar_clave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$administrador->setContraseña($_POST['clave_nueva'])) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($administrador->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            case 'changeStatus':
                // Cambiamos el estado de un administrador según el ID enviado por POST
                if (!$administrador->setId($_POST[POST_ID])) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($administrador->changeStatus()) {
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
        // Procesamos las acciones disponibles cuando no hay sesión activa
        switch ($_GET['action']) {
            case 'readUsers':
                // Leemos todos los administradores
                if ($administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'signUp':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Validamos cada campo del formulario
                if (
                    !$administrador->setNombre($_POST[POST_NOMBRE]) or
                    !$administrador->setApellido($_POST[POST_APELLIDO]) or
                    !$administrador->setCorreo($_POST[POST_CORREO]) or
                    !$administrador->setUsuario($_POST[POST_USUARIO]) or
                    !$administrador->setContraseña($_POST[POST_CONTRASEÑA]) or
                    !$administrador->setEstado(1)
                ) {
                    $result['error'] = $administrador->getDataError(); // Guardamos el error de validación
                } elseif ($_POST[POST_CONTRASEÑA] != $_POST[POST_CONFIRMAR_CONTRASEÑA]) {
                    $result['error'] = 'Contraseñas diferentes'; // Error si las contraseñas no coinciden
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el administrador';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST); // Validamos todos los campos del formulario

                // Verificamos las credenciales de inicio de sesión
                if ($administrador->checkUser($_POST[POST_USUARIO], $_POST[POST_CONTRASEÑA])) {
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

    $result['exception'] = Database::getException(); // Obtenemos cualquier excepción de la base de datos
    header('Content-type: application/json; charset=utf-8'); // Establecemos la cabecera JSON
    print(json_encode($result)); // Imprimimos el resultado como JSON
} else {
    print(json_encode('Recurso no disponible')); // Si no se proporciona 'action', se imprime un mensaje
}

