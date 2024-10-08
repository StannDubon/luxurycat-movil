<?php
// Se incluye la clase del modelo.
require_once('../../models/data/producto_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $producto = new ProductoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']) {
            // Buscar
        case 'searchRows':
            if (!Validator::validateSearch($_POST['search'])) {
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $producto->searchRows()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else {
                $result['error'] = 'No hay coincidencias';
            }
            break;
            // Leer todos
        case 'readAll':
            if ($result['dataset'] = $producto->readActive()) {
                $result['status'] = 1;
                $result['message'] = 'Mostrando ' . count($result['dataset']) . ' productos';
            } else {
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'readOne':
            if (!$producto->setId($_POST['idProducto'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readOneActive()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Producto inexistente';
            }
            break;     
        case 'readByCategory':
            if (!$producto->setCategoriaId($_POST['idCategoria'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readByCategory()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Producto inexistente';
            }
            break;   
        default:
            $result['error'] = 'Acción no disponible';
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
