// Constante para completar la ruta de la API.
const ADMINISTRADOR_API = 'services/admin/administrador.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_INPUT = document.getElementById('searchInput');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ADMIN_ID = document.getElementById('admin_id'),
    ADMIN_NOMBRE = document.getElementById('admin_nombre');
    ADMIN_APELLIDO = document.getElementById('admin_apellido');
    ADMIN_CORREO = document.getElementById('admin_correo');
    ADMIN_USUARIO = document.getElementById('admin_usuario');
    ADMIN_CONTRASEÑA = document.getElementById('admin_contraseña');
    ADMIN_CONFIRMAR_CONTRASEÑA = document.getElementById('confirmar_contraseña');

const RADIO_ESTADO_ACTIVO = document.getElementById("activo");
const RADIO_ESTADO_INACTIVO = document.getElementById("inactivo");


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate()
    fillTable();
});

const openCreate = () => {
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear Marca';
    SAVE_FORM.reset();
}

SEARCH_INPUT.addEventListener('input', (event) => {
    // Constante tipo objeto con los datos del formulario.
    event.preventDefault();
    const FORM = new FormData();
    FORM.append('search', SEARCH_INPUT.value);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();

    let action = (ADMIN_ID.value) ? 'updateRow' : 'createRow';

    if (ADMIN_CONTRASEÑA.value !== "" || ADMIN_CONFIRMAR_CONTRASEÑA.value !== "") {
        action = 'updateRowPassword';
    }

    const FORM = new FormData(SAVE_FORM);
    const DATA = await fetchData(ADMINISTRADOR_API, action, FORM);

    if (DATA.status) {
        SAVE_MODAL.hide();
        ADMIN_ID.value = null;
        sweetAlert(1, DATA.message, true);
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
    TABLE_BODY.innerHTML = '';
    if (form === null) {
        form = new FormData();
    }
    const searchValue = form.get('search');
    const action = searchValue ? 'searchRows' : 'readAll';

    const DATA = await fetchData(ADMINISTRADOR_API, action, form);
    if (DATA.status) {
        if (action === 'searchRows' && DATA.dataset.length === 0) {
            VoidResult(DATA.error)
        } else {
            DATA.dataset.forEach(row => {
                let color_estado;
    
                if (row.admin_estado == 1) {
                    color_estado = "#71D17A";
                } else {
                    color_estado = "#F87777";
                }
                TABLE_BODY.innerHTML += `
                    <tr>
                        <td class="col-1">${row.admin_id}</td>
                        <td class="col-1">${row.admin_nombre}</td>
                        <td class="col-1">${row.admin_apellido}</td>
                        <td class="col-1">${row.admin_usuario}</td>
                        <td class="col-1">${row.admin_correo}</td>
                        <td class="col-2">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: ${color_estado};" onclick="openState(${row.admin_id})">
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>

                        </td>
                        <td class="col-1">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-3 editar" onclick="openUpdate(${row.admin_id})">
                                        <img src="../../resources/svg/editar.svg" alt="" />
                                    </div>
                                    <div class="col-3 eliminar" onclick="openDelete(${row.admin_id})">
                                        <img src="../../resources/svg/eliminar.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
            });
        }
    } else {
        VoidResult(DATA.error)
    }
}


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
            FORM.append('admin_id', id);
            console.log(id);
            const DATA = await fetchData(ADMINISTRADOR_API, 'changeStatus', FORM);
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
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/


/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    const FORM = new FormData();
    FORM.append('admin_id', id);
    const DATA = await fetchData(ADMINISTRADOR_API, 'readOne', FORM);
    if (DATA.status) {
        SAVE_MODAL.show();

        MODAL_TITLE.textContent = 'Actualizar marca';
        SAVE_FORM.reset();
        const ROW = DATA.dataset;
        ADMIN_ID.value = ROW.admin_id;
        ADMIN_NOMBRE.value = ROW.admin_nombre;
        ADMIN_APELLIDO.value = ROW.admin_apellido;
        ADMIN_CORREO.value = ROW.admin_correo;
        ADMIN_USUARIO.value = ROW.admin_usuario;

        if (ROW.admin_estado == 1) {
            RADIO_ESTADO_ACTIVO.checked = true;
        } else if (ROW.admin_estado == 0) {
            RADIO_ESTADO_INACTIVO.checked = true;
        }
    } else {
        sweetAlert(2, DATA.error, false);
    }

}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
    try {
        if (RESPONSE) {
            const FORM = new FormData();
            FORM.append('admin_id', id);
            const DATA = await fetchData(ADMINISTRADOR_API, 'deleteRow', FORM);
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
  