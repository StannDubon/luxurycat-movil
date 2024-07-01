// Constante para completar la ruta de la API.
const PEDIDO_API = 'services/public/Pedido.php';
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  fillTable();
});


/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
  TABLE_BODY.innerHTML = '';
  if (form === null) {
    form = new FormData();
  }

  const DATA = await fetchData(PEDIDO_API, 'getHistory', form);
  if (DATA.status) {
    if (DATA.dataset.length === 0) {
      TABLE_BODY.innerHTML += `${DATA.error}`;
    } else {
      for (const pedido of DATA.dataset) {
        const formData = new FormData();
        formData.append('idPedido', pedido.pedido_id);
  
        // Petición para obtener los registros disponibles.
        const productData = await fetchData(PEDIDO_API, 'getHistoryProducts', formData);
        console.log(productData);
  
        var tablaProductos = ""; // Inicializar la variable como una cadena vacía
  
        for (const producto of productData.dataset) {
          tablaProductos += `
            <tr>
              <td>${producto.producto_nombre}</td>
              <td>${producto.detalle_cantidad}</td>
              <td>${producto.detalle_precio}</td>
              <td>${Math.round(parseFloat(producto.detalle_cantidad) * parseFloat(producto.detalle_precio) * 100)/100}</td>
            </tr>
          `;
        }
  
        TABLE_BODY.innerHTML += `
          <div class="container-fluid mt-4">
            <div class="row">
              <div class="col-12">
                <div class="card invoice-card">
                  <div class="card-body">
                    <div class="invoice-header">
                      <h2 class="invoice-title" style="align-self: center;">
                        ${pedido.pedido_id}
                      </h2>
                      <div class="d-flex justify-content-between">
                        <span><b>${pedido.usuario_nombre + " " + pedido.usuario_apellido}, ${pedido.pedido_direccion}</b> <br> ${pedido.pedido_fechaSolicitud}</span>
                        <span><b>Estado:</b> Enviado</span>
                      </div>
                    </div> <!-- /invoice-header -->
                    <div class="table-responsive">
                      <table id="invoiceTable3" class="table" width="100%">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${tablaProductos}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colspan="3" class="text-right"><b>TOTAL:</b></td>
                            <td><b>$${pedido.precio_total}</b></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    }
  } else {
    TABLE_BODY.innerHTML += `${DATA.error}`;
  }
}  


function getRandomCatImage() {
  return fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(data => data[0].url)
    .catch(error => {
      console.error('Error fetching the cat image:', error);
      return null;
    });
}
