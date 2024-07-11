<?php
// Se incluye la clase del modelo.
require_once ('../../models/data/cliente_data.php');

const POST_ID = "usuario_id";
const POST_NOMBRE = "usuario_nombre";
const POST_APELLIDO = "usuario_apellido";
const POST_USUARIO = "usuario_usuario";
const POST_CONTRASEÑA = "usuario_contraseña";
const POST_CONFIRMAR_CONTRASEÑA = "confirmar_contraseña";
const POST_CORREO = "usuario_correo";
const POST_ESTADO = "usuario_estado";

// constantes para cambiar contraseña
const POST_NCONTRASEÑA = "usuario_nueva_contraseña";
const POST_CNCONTRASEÑA = "usuario_confirmar_nueva_contraseña";

const POST_CODIGO_SECRETO_CONTRASEÑA = "codigoSecretoContraseña";

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new UsuarioData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null, 'name' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION[POST_ID])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION["usuario_correo"])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION["usuario_correo"];
                } else {
                    $result['error'] = 'Correo de usuario indefinido';
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
                    !$cliente->setNombre($_POST[POST_NOMBRE]) or
                    !$cliente->setApellido($_POST[POST_APELLIDO]) or
                    !$cliente->setCorreo($_POST[POST_CORREO]) or
                    !$cliente->setUsuario($_POST[POST_USUARIO])
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
                if (!$cliente->checkPassword($_POST[POST_CONTRASEÑA])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST[POST_NCONTRASEÑA] != $_POST[POST_CNCONTRASEÑA]) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$cliente->setContraseña($_POST[POST_NCONTRASEÑA])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                // Se establece la clave secreta para el reCAPTCHA de acuerdo con la cuenta de Google.
                $secretKey = '6LdBzLQUAAAAAL6oP4xpgMao-SmEkmRCpoLBLri-';
                // Se establece la dirección IP del servidor.
                $ip = $_SERVER['REMOTE_ADDR'];
                // Se establecen los datos del raCAPTCHA.
                $data = array('secret' => $secretKey, 'response' => $_POST['gRecaptchaResponse'], 'remoteip' => $ip);
                // Se establecen las opciones del reCAPTCHA.
                $options = array(
                    'http' => array('header' => 'Content-type: application/x-www-form-urlencoded\r\n', 'method' => 'POST', 'content' => http_build_query($data)),
                    'ssl' => array('verify_peer' => false, 'verify_peer_name' => false)
                );

                $url = 'https://www.google.com/recaptcha/api/siteverify';
                $context = stream_context_create($options);
                $response = file_get_contents($url, false, $context);
                $captcha = json_decode($response, true);

                if (!$captcha['success']) {
                    $result['recaptcha'] = 1;
                    $result['error'] = 'No eres humano';
                } elseif (!isset($_POST['condicion'])) {
                    $result['error'] = 'Debe marcar la aceptación de términos y condiciones';
                } elseif (
                    !$cliente->setNombre($_POST[POST_NOMBRE]) or
                    !$cliente->setApellido($_POST[POST_APELLIDO]) or
                    !$cliente->setUsuario($_POST[POST_USUARIO]) or
                    !$cliente->setContraseña($_POST[POST_CONTRASEÑA]) or
                    !$cliente->setCorreo($_POST[POST_CORREO]) or
                    !$cliente->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST[POST_CONTRASEÑA] != $_POST[POST_CONFIRMAR_CONTRASEÑA]) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
            case 'signUpMovil':
                $_POST = Validator::validateForm($_POST);
            if (
                    !$cliente->setNombre($_POST[POST_NOMBRE]) or
                    !$cliente->setApellido($_POST[POST_APELLIDO]) or
                    !$cliente->setUsuario($_POST[POST_USUARIO]) or
                    !$cliente->setContraseña($_POST[POST_CONTRASEÑA]) or
                    !$cliente->setCorreo($_POST[POST_CORREO]) or
                    !$cliente->setEstado($_POST[POST_ESTADO])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST[POST_CONTRASEÑA] != $_POST[POST_CONFIRMAR_CONTRASEÑA]) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkUser($_POST[POST_USUARIO], $_POST[POST_CONTRASEÑA])) {
                    $result['error'] = 'Datos incorrectos';
                } elseif ($cliente->checkStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'La cuenta ha sido desactivada';
                }
                break;



            // CASOS PARA CAMBIO DE CONTRASEÑA POR EMAIL

            case 'emailPasswordSender':
                $_POST = Validator::validateForm($_POST);

                if (!$cliente->setCorreo($_POST[POST_CORREO])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->verifyExistingEmail()) {

                    $secret_change_password_code = mt_rand(10000000, 99999999);
                    $token = Validator::generateRandomString(64);
                    $_SESSION['secret_change_password_code'] = [
                        'code' => $secret_change_password_code,
                        'token' => $token,
                        'expiration_time' => time() + (60 * 15) # (x*y) y=minutos de vida 
                    ];

                    sendVerificationEmail($_POST[POST_CORREO], $secret_change_password_code);
                    $result['status'] = 1;
                    $result['message'] = 'Correo enviado';
                    $result['dataset'] = $token;
                } else {
                    $result['error'] = 'El correo indicado no existe';
                }
                break;
            case 'emailPasswordValidator':
                $_POST = Validator::validateForm($_POST);
            
                if (!isset($_POST[POST_CODIGO_SECRETO_CONTRASEÑA])) {
                    $result['error'] = "El código no fue proporcionado";
                } elseif (!isset($_POST["token"])) {
                    $result['error'] = 'El token no fue proporcionado';
                } elseif (!(ctype_digit($_POST[POST_CODIGO_SECRETO_CONTRASEÑA]) && strlen($_POST[POST_CODIGO_SECRETO_CONTRASEÑA]) === 8)) {
                    $result['error'] = "El código es inválido";
                } elseif (!isset($_SESSION['secret_change_password_code'])) {
                    $result['message'] = "El código ha expirado";
                } elseif ($_SESSION['secret_change_password_code']['token'] != $_POST["token"]) {
                    $result['error'] = 'El token es invalido';
                } elseif ($_SESSION['secret_change_password_code']['expiration_time'] <= time()) {
                    $result['message'] = "El código ha expirado.";
                    unset($_SESSION['secret_change_password_code']);
                } elseif ($_SESSION['secret_change_password_code']['code'] == $_POST[POST_CODIGO_SECRETO_CONTRASEÑA]) {
                    $token = Validator::generateRandomString(64);
                    $_SESSION['secret_change_password_code_validated'] = [
                        'token' => $token,
                        'expiration_time' => time() + (60 * 10) # (x*y) y=minutos de vida 
                    ];
                    $result['status'] = 1;
                    $result['message'] = "Verificación Correcta";
                    $result['dataset'] = $token;
                    unset($_SESSION['secret_change_password_code']);
                } else {
                    $result['error'] = "El código es incorrecto";
                }
                break;
            case 'changePasswordByEmail':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->setContraseña($_POST[POST_NCONTRASEÑA]) or
                    !$cliente->setCorreo($_POST[POST_CORREO])) {
                    $result['error'] = $cliente->getDataError();
                } elseif (!isset($_POST["token"])) {
                    $result['error'] = 'El token no fue proporcionado';
                } elseif ($_SESSION['secret_change_password_code_validated']['expiration_time'] <= time()) {
                    $result['error'] = 'El tiempo para cambiar su contraseña ha expirado';
                } elseif ($_SESSION['secret_change_password_code_validated']['token'] != $_POST["token"]) {
                    $result['error'] = 'El token es invalido';
                } elseif ($_POST[POST_NCONTRASEÑA] != $_POST[POST_CNCONTRASEÑA]) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$cliente->setContraseña($_POST[POST_NCONTRASEÑA])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changePasswordFromEmail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                    unset($_SESSION['secret_change_password_code_validated']);
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;



            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print (json_encode($result));
} else {
    print (json_encode('Recurso no disponible'));
}
