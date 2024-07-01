// Constantes para completar las rutas de la API.
const PRODUCTO_API = "services/admin/producto.php";
const CATEGORIA_API = "services/admin/categoria.php";
const MARCA_API = "services/admin/marca.php";
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById("searchForm");
const SEARCH_INPUT = document.getElementById("searchInput");
// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById("tableBody");
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal("#saveModal"),
  MODAL_TITLE = document.getElementById("modalTitle");
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById("saveForm"),
  ID_PRODUCTO = document.getElementById("producto_id"),
  NOMBRE_PRODUCTO = document.getElementById("producto_nombre"),
  DESCRIPCION_PRODUCTO = document.getElementById("producto_descripcion"),
  PRECIO_PRODUCTO = document.getElementById("producto_precio"),
  EXISTENCIAS_PRODUCTO = document.getElementById("producto_cantidad")

const RADIO_ESTADO_ACTIVO = document.getElementById("activo");
const RADIO_ESTADO_INACTIVO = document.getElementById("inactivo");

// Método del evento para cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", () => {
  // Llamada a la función para mostrar el encabezado y pie del documento.
  loadTemplate();
  // Llamada a la función para llenar la tabla con los registros existentes.
  fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_INPUT.addEventListener("input", (event) => {
  // Constante tipo objeto con los datos del formulario.
  event.preventDefault();
  const FORM = new FormData();
  FORM.append("search", SEARCH_INPUT.value);
  // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
  fillTable(FORM);
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener("submit", async (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se verifica la acción a realizar.
  ID_PRODUCTO.value ? (action = "updateRow") : (action = "createRow");
  // Constante tipo objeto con los datos del formulario.
  const FORM = new FormData(SAVE_FORM);
  // Petición para guardar los datos del formulario.
  const DATA = await fetchData(PRODUCTO_API, action, FORM);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
    // Se cierra la caja de diálogo.
    SAVE_MODAL.hide();
    // Se muestra un mensaje de éxito.
    sweetAlert(1, DATA.message, true);
    // Se carga nuevamente la tabla para visualizar los cambios.
    fillTable();
  } else {
    sweetAlert(2, DATA.error, false);
  }
});

/*
 *   Función asíncrona para llenar la tabla con los registros disponibles.
 *   Parámetros: form (objeto opcional con los datos de búsqueda).
 *   Retorno: ninguno.
 */
const fillTable = async (form = null) => {
  // Se inicializa el contenido de la tabla.
  TABLE_BODY.innerHTML = '';
  if (form === null) {
      form = new FormData();
  }
  // Se verifica la acción a realizar.
  const searchValue = form.get('search');
  const action = searchValue ? 'searchRows' : 'readAll';
  // Petición para obtener los registros disponibles.
  const DATA = await fetchData(PRODUCTO_API, action, form);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
    if (action === 'searchRows' && DATA.dataset.length === 0) {
      VoidResult(DATA.error);
    } else {
      // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach((row) => {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.

        let color_estado;

        if (row.producto_estado == 1) {
          color_estado = "#71D17A";
        } else {
          color_estado = "#F87777";
        }

        TABLE_BODY.innerHTML += `
            <tr>
                <td class="col-1">${row.producto_id}</td>
                <td class="col-2">${row.producto_nombre}</td>
                <td class="col-1">${row.categoria}</td>
                <td class="col-2">${row.marca}</td>
                <td class="col-1">${row.producto_imagen}</td>
                <td class="col-1">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: ${color_estado};" onclick="openState(${row.producto_id})">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>

                </td>
                <td class="col-1">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-3 editar">
                                <img src="../../resources/svg/editar.svg"  onclick="openUpdate(${row.producto_id})"/>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            `;
      });
    }
  } else {
    VoidResult(DATA.error);
  }
};

/*
 *   Función para preparar el formulario al momento de insertar un registro.
 *   Parámetros: ninguno.
 *   Retorno: ninguno.
 */
const openCreate = () => {
  // Se muestra la caja de diálogo con su título.
  SAVE_MODAL.show();
  MODAL_TITLE.textContent = "Crear producto";
  // Se prepara el formulario.
  SAVE_FORM.reset();
  fillSelect(CATEGORIA_API, "readAll", "categoria_id");
  fillSelect(MARCA_API, "readAll", "marca_id");
};

/*
*   Función asíncrona para cambiar el estado de un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openState = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea cambiar el estado de la marca?');
    try {
        if (RESPONSE) {
            const FORM = new FormData();
            FORM.append('producto_id', id);
            console.log(id);
            const DATA = await fetchData(PRODUCTO_API, 'changeStatus', FORM);
            console.log(DATA.status);
            if (DATA.status) {
                await sweetAlert(1, DATA.message, true);
                fillTable();
            } else {
                sweetAlert(2, DATA.error, false);
            }
        }
    }
    catch (Error) {
        console.log(Error + ' Error al cargar el mensaje');
    }
}

/*
 *   Función asíncrona para preparar el formulario al momento de actualizar un registro.
 *   Parámetros: id (identificador del registro seleccionado).
 *   Retorno: ninguno.
 */
const openUpdate = async (id) => {
  // Se define un objeto con los datos del registro seleccionado.
  const FORM = new FormData();
  FORM.append("producto_id", id);
  // Petición para obtener los datos del registro solicitado.
  const DATA = await fetchData(PRODUCTO_API, "readOne", FORM);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = "Actualizar producto";
    // Se prepara el formulario.
    SAVE_FORM.reset();
    // Se inicializan los campos con los datos.
    const ROW = DATA.dataset;
    ID_PRODUCTO.value = ROW.producto_id;
    NOMBRE_PRODUCTO.value = ROW.producto_nombre;
    DESCRIPCION_PRODUCTO.value = ROW.producto_descripcion;
    PRECIO_PRODUCTO.value = ROW.producto_precio;
    EXISTENCIAS_PRODUCTO.value = ROW.producto_cantidad;


    if (ROW.producto_estado == 1) {
        RADIO_ESTADO_ACTIVO.checked = true;
    } else if (ROW.producto_estado == 0) {
        RADIO_ESTADO_INACTIVO.checked = true;
    }


    fillSelect(MARCA_API, "readAll", "marca_id", ROW.marca_id);
    fillSelect(CATEGORIA_API, "readAll", "categoria_id", ROW.categoria_id);
  } else {
    sweetAlert(2, DATA.error, false);
  }
};

const VoidResult = async (error) => {
  TABLE_BODY.innerHTML += `
    <tr>
    <td class="col-1"></td>
    <td class="col-2">${error}</td>
    <td class="col-1"></td>
    <td class="col-2"></td>
    <td class="col-1"></td>
    <td class="col-1"></td>
    <td class="col-1"></td>
    </tr>
    `;
};
