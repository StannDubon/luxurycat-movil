// Constante para completar la ruta de la API.
const COMENTARIO_API = 'services/admin/comentario.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_INPUT = document.getElementById('searchInput');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    fillTable();
});

SEARCH_INPUT.addEventListener('input', (event) => {
    // Constante tipo objeto con los datos del formulario.
    event.preventDefault();
    const FORM = new FormData();
    FORM.append('search', SEARCH_INPUT.value);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
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

    const DATA = await fetchData(COMENTARIO_API, action, form);
    if (DATA.status) {
        if (action === 'searchRows' && DATA.dataset.length === 0) {
            TABLE_BODY.innerHTML += `
            <tr>
            <td class="col-1"></td>
            <td class="col-3"><b>${DATA.error}</b></td>
            <td class="col-2"></td>
            <td class="col-1"></td>
            <td class="col-3"></td>
            <td class="col-2"></td>
            </tr>
            `;
        } else {
            DATA.dataset.forEach(row => {
                let color_estado;
                
                if (row.comentario_estado == 1) {
                    color_estado = "#71D17A";
                } else {
                    color_estado = "#F87777";
                }
                TABLE_BODY.innerHTML += `
                    <tr>
                    <td class="col-1">${row.id_comentario}</td>
                    <td class="col-3">${row.cliente}</td>
                    <td class="col-2">${row.producto}</td>
                    <td class="col-1">${row.fecha_del_comentario}</td>
                    <td class="col-3">${row.comentario}</td>
                    <td class="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: ${color_estado};" onclick="openState(${row.id_comentario})">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>
                    </td>
                    </tr>
                `;
            });
        }
    } else {
        TABLE_BODY.innerHTML += `
        <tr>
        <td class="col-1"></td>
        <td class="col-3"><b>${DATA.error}</b></td>
        <td class="col-2"></td>
        <td class="col-1"></td>
        <td class="col-3"></td>
        <td class="col-2"></td>
        </tr>
        `;
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
            FORM.append('idComentario', id);
            console.log(id);
            const DATA = await fetchData(COMENTARIO_API, 'changeStatus', FORM);
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

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/reporte_general_comentarios.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
  }