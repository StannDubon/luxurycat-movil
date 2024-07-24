<?php
// Importa los archivos necesarios para el reporte y la obtención de datos
require_once('../../helpers/report2.php');
require_once('../../models/data/pedido_data.php');

// Crea la instancia del reporte
$pdf = new Report2;
// Inicia el reporte con el título 'Reporte de pedidos'
$pdf->startReport('Factura');

// Crea una instancia de la clase AdministradorData para obtener los datos de los pedidos
$pedidos = new PedidoData;

// Verifica si existen datos en el producto
if ($PedidoData = $pedidos->readDetailInvoice()) {
    // Configura los estilos del reporte
    $pdf->setFillColor(169, 169, 169); // Color de fondo de las celdas del encabezado (gris)
    $pdf->setDrawColor(169, 169, 169); // Color de borde de las celdas del encabezado (gris)
    $pdf->setFont('Arial', 'B', 11); // Fuente y tamaño del texto del encabezado

    // Agrega las celdas del encabezado con el título de cada columna
    // Explicación de celdas (Ancho, Alto, Texto, Borde, Salto de linea, Alineación (Centrado = C, Izquierda = L, Derecha = R), Fondo, Link (Opcional))
    $pdf->cell(60, 15, 'Producto', 1, 0, 'C', 1);
    $pdf->cell(40, 15, 'Precio (US$)', 1, 0, 'C', 1);
    $pdf->cell(50, 15, 'Cantidad', 1, 0, 'C', 1);
    $pdf->cell(36, 15, 'Subtotal (US$)', 1, 1, 'C', 1);

    // Configura el color de fondo para las filas de datos
    $pdf->setFillColor(240);
    // Configura la fuente para las filas de datos
    $pdf->setFont('Arial', 'B', 11);
    // Se establece la variable de total en 0 para su uso mas adelante.
    $total = 0;
    // Recorre cada producto obtenido de la base de datos
    foreach ($PedidoData as $rowpedidos) {
        // Verifica si la posición Y actual más 15 (alto de la celda) supera el límite de la página
        if ($pdf->getY() + 15 > 279 - 30) { // Ajusta este valor según el tamaño de tus celdas y la altura de la página
            $pdf->addPage('P', 'Letter'); // Añade una nueva página de tamaño carta
            // Configura de nuevo los estilos del encabezado en la nueva página
            $pdf->setFillColor(169, 169, 169);
            $pdf->setDrawColor(169, 169, 169);
            $pdf->setFont('Arial', 'B', 11);
            // Vuelve a imprimir los encabezados en la nueva página
            $pdf->cell(60, 15, 'Producto', 1, 0, 'C', 1);
            $pdf->cell(40, 15, 'Precio (US$)', 1, 0, 'C', 1);
            $pdf->cell(50, 15, 'Cantidad', 1, 0, 'C', 1);
            $pdf->cell(36, 15, 'Subtotal (US$)', 1, 1, 'C', 1);
        }

        // Se establece el valor del subtotal multiplicando el precio por la cantidad.
        $subtotal = $rowpedidos['detalle_precio'] * $rowpedidos['detalle_cantidad'];
        // Se establece el valor del total, como la suma de todos los subtotales.
        $total += $subtotal;
        // Obtén la coordenada Y actual
        $currentY = $pdf->getY();
        // Configura el color de fondo y el borde de las celdas de datos
        $pdf->setFillColor(211, 211, 211); // Fondo gris claro para las filas de datos
        $pdf->setDrawColor(192, 192, 192); // Borde gris para las celdas de datos
        $pdf->setFont('Arial', 'B', 11);

        // Imprime las celdas con los datos del producto y la imagen
        $pdf->setFillColor(255, 255, 255); // Fondo blanco para las celdas de datos
        $pdf->cell(60, 15, $pdf->encodeString($rowpedidos['producto_nombre']), 1, 0, 'C'); // Celda de nombre
        $pdf->cell(40, 15, $pdf->encodeString('$'.$rowpedidos['detalle_precio']), 1, 0, 'C'); // Celda de usuario
        $pdf->cell(50, 15, $pdf->encodeString($rowpedidos['detalle_cantidad']), 1, 0, 'C'); // Celda de Dirección
        $pdf->cell(36, 15, '$'.$subtotal, 1, 1, 'C'); // Celda de subtotal
    }
    $pdf->cell(126, 10, 'Factura a nombre de: ' . $pdf->encodeString($_SESSION['usuario_usuario']), 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Total: $' . $total, 1, 1, 'C', 1);
} else {
    // Si no hay pedidos para mostrar, se imprime un mensaje en una celda
    $pdf->cell(0, 15, $pdf->encodeString('No hay pedidos para mostrar'), 1, 1);
}

// Genera el reporte con el nombre 'pedidos.pdf' y lo muestra en el navegador
$pdf->output('I', 'pedidos.pdf');
?>

