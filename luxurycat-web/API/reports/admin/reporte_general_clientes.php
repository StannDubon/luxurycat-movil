<?php
// Importa los archivos necesarios para el reporte y la obtención de datos
require_once('../../helpers/report.php');
require_once('../../models/data/cliente_data.php');

// Crea la instancia del reporte
$pdf = new Report;
// Inicia el reporte con el título 'Reporte de Clientes'
$pdf->startReport('Reporte de Clientes');

// Crea una instancia de la clase UsuarioData para obtener los datos de los clientes
$Clientes = new UsuarioData;

// Verifica si existen datos en el producto
if ($UsuarioData = $Clientes->readAll()) {
    // Configura los estilos del reporte
    $pdf->setFillColor(169, 169, 169); // Color de fondo de las celdas del encabezado (gris)
    $pdf->setDrawColor(169, 169, 169); // Color de borde de las celdas del encabezado (gris)
    $pdf->setFont('Arial', 'B', 11); // Fuente y tamaño del texto del encabezado

    // Agrega las celdas del encabezado con el título de cada columna
    // Explicación de celdas (Ancho, Alto, Texto, Borde, Salto de linea, Alineación (Centrado = C, Izquierda = L, Derecha = R), Fondo, Link (Opcional))
    $pdf->cell(30, 15, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(30, 15, 'Apellido', 1, 0, 'C', 1);
    $pdf->cell(40, 15, 'Usuario', 1, 0, 'C', 1);
    $pdf->cell(70, 15, 'Correo', 1, 0, 'C', 1);
    $pdf->cell(20, 15, 'Estado', 1, 1, 'C', 1);

    // Configura el color de fondo para las filas de datos
    $pdf->setFillColor(240);
    // Configura la fuente para las filas de datos
    $pdf->setFont('Arial', 'B', 11);

    // Recorre cada producto obtenido de la base de datos
    foreach ($UsuarioData as $rowproductos) {
        // Define el estado del producto basado en el valor de 'usuario_estado'
        ($rowproductos['usuario_estado']) ? $estado = 'Activo' : $estado = 'Inactivo';

        // Verifica si la posición Y actual más 15 (alto de la celda) supera el límite de la página
        if ($pdf->getY() + 15 > 279 - 30) { // Ajusta este valor según el tamaño de tus celdas y la altura de la página
            $pdf->addPage('P', 'Letter'); // Añade una nueva página de tamaño carta
            // Configura de nuevo los estilos del encabezado en la nueva página
            $pdf->setFillColor(169, 169, 169);
            $pdf->setDrawColor(169, 169, 169);
            $pdf->setFont('Arial', 'B', 11);
            // Vuelve a imprimir los encabezados en la nueva página
            $pdf->cell(30, 15, 'Nombre', 1, 0, 'C', 1);
            $pdf->cell(30, 15, 'Apellido', 1, 0, 'C', 1);
            $pdf->cell(40, 15, 'Usuario', 1, 0, 'C', 1);
            $pdf->cell(70, 15, 'Correo', 1, 0, 'C', 1);
            $pdf->cell(20, 15, 'Estado', 1, 1, 'C', 1);
        }

        // Obtén la coordenada Y actual
        $currentY = $pdf->getY();
        // Configura el color de fondo y el borde de las celdas de datos
        $pdf->setFillColor(211, 211, 211); // Fondo gris claro para las filas de datos
        $pdf->setDrawColor(192, 192, 192); // Borde gris para las celdas de datos
        $pdf->setFont('Arial', 'B', 11);

        // Imprime las celdas con los datos del producto y la imagen
        $pdf->setFillColor(255, 255, 255); // Fondo blanco para las celdas de datos
        $pdf->cell(30, 15, $pdf->encodeString($rowproductos['usuario_nombre']), 1, 0, 'C'); // Celda de nombre
        $pdf->cell(30, 15, $pdf->encodeString($rowproductos['usuario_apellido']), 1, 0, 'C'); // Celda de apellido
        $pdf->cell(40, 15, $pdf->encodeString($rowproductos['usuario_usuario']), 1, 0, 'C'); // Celda de usuario
        $pdf->cell(70, 15, $pdf->encodeString($rowproductos['usuario_correo']), 1, 0, 'C'); // Celda de correo
        $pdf->cell(20, 15, $estado, 1, 1, 'C'); // Celda de estado
    }
} else {
    // Si no hay Clientes para mostrar, se imprime un mensaje en una celda
    $pdf->cell(0, 15, $pdf->encodeString('No hay Clientes para mostrar'), 1, 1);
}

// Genera el reporte con el nombre 'Clientes.pdf' y lo muestra en el navegador
$pdf->output('I', 'Clientes.pdf');
?>
