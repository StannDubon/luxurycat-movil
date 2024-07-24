
<?php
// Importa los archivos necesarios para el reporte y la obtención de datos
require_once('../../helpers/report.php');
require_once('../../models/data/comentario_data.php');

// Crea la instancia del reporte
$pdf = new Report;
// Inicia el reporte con el título 'Reporte de Comentario'
$pdf->startReport('Reporte de Comentario');

// Crea una instancia de la clase AdministradorData para obtener los datos de los Comentario
$Comentario = new ComentarioData;

// Verifica si existen datos en el producto
if ($ComentarioData = $Comentario->readAll()) {
    // Configura los estilos del reporte
    $pdf->setFillColor(169, 169, 169); // Color de fondo de las celdas del encabezado (gris)
    $pdf->setDrawColor(169, 169, 169); // Color de borde de las celdas del encabezado (gris)
    $pdf->setFont('Arial', 'B', 11); // Fuente y tamaño del texto del encabezado

    // Agrega las celdas del encabezado con el título de cada columna
    // Explicación de celdas (Ancho, Alto, Texto, Borde, Salto de linea, Alineación (Centrado = C, Izquierda = L, Derecha = R), Fondo, Link (Opcional))
    $pdf->cell(40, 15, 'Cliente', 1, 0, 'C', 1);
    $pdf->cell(35, 15, 'Producto', 1, 0, 'C', 1);
    $pdf->cell(30, 15, 'Fecha', 1, 0, 'C', 1);
    $pdf->cell(81, 15,  $pdf->encodeString('comentario'), 1, 1, 'C', 1);

    // Configura el color de fondo para las filas de datos
    $pdf->setFillColor(240);
    // Configura la fuente para las filas de datos
    $pdf->setFont('Arial', 'B', 11);

    // Recorre cada producto obtenido de la base de datos
    foreach ($ComentarioData as $rowComentario) {
        // Define el estado del producto basado en el valor de 'usuario_estado'
        ($rowComentario['comentario_estado']) ? $estado = 'Activo' : $estado = 'Inactivo';

        // Verifica si la posición Y actual más 15 (alto de la celda) supera el límite de la página
        if ($pdf->getY() + 15 > 279 - 30) { // Ajusta este valor según el tamaño de tus celdas y la altura de la página
            $pdf->addPage('P', 'Letter'); // Añade una nueva página de tamaño carta
            // Configura de nuevo los estilos del encabezado en la nueva página
            $pdf->setFillColor(169, 169, 169);
            $pdf->setDrawColor(169, 169, 169);
            $pdf->setFont('Arial', 'B', 11);
            // Vuelve a imprimir los encabezados en la nueva página
            $pdf->cell(40, 15, 'Cliente', 1, 0, 'C', 1);
            $pdf->cell(35, 15, 'Producto', 1, 0, 'C', 1);
            $pdf->cell(30, 15, 'Fecha', 1, 0, 'C', 1);
            $pdf->cell(81, 15, $pdf->encodeString('comentario'), 1, 1, 'C', 1);
        }

        // Obtén la coordenada Y actual
        $currentY = $pdf->getY();
        // Configura el color de fondo y el borde de las celdas de datos
        $pdf->setFillColor(211, 211, 211); // Fondo gris claro para las filas de datos
        $pdf->setDrawColor(192, 192, 192); // Borde gris para las celdas de datos
        $pdf->setFont('Arial', 'B', 11);

        // Imprime las celdas con los datos del producto y la imagen
        $pdf->setFillColor(255, 255, 255); // Fondo blanco para las celdas de datos
        $pdf->cell(40, 15, $pdf->encodeString($rowComentario['cliente']), 1, 0, 'C'); // Celda de nombre
        $pdf->cell(35, 15, $pdf->encodeString($rowComentario['producto']), 1, 0, 'C');
        $pdf->cell(30, 15, $pdf->encodeString($rowComentario['fecha_del_comentario']), 1, 0, 'C'); // Celda de usuario
        $pdf->cell(81, 15, $pdf->encodeString($rowComentario['comentario']), 1, 1, 'C'); // Celda de Dirección
    }
} else {
    // Si no hay Comentario para mostrar, se imprime un mensaje en una celda
    $pdf->cell(0, 15, $pdf->encodeString('No hay Comentario para mostrar'), 1, 1);
}

// Genera el reporte con el nombre 'Comentario.pdf' y lo muestra en el navegador
$pdf->output('I', 'Comentario.pdf');
?>
