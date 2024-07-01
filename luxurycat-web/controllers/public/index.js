// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/public/categoria.php';
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

    const DATA = await fetchData(CATEGORIA_API, 'readAll', form);
    if (DATA.status) {
        if (DATA.dataset.length === 0) {
            TABLE_BODY.innerHTML += `${DATA.error}`;
        } else {
            DATA.dataset.forEach(row => {
                getRandomCatImage().then(catImageUrl => {
                    TABLE_BODY.innerHTML += `
                    <a href="../public/categorias.html?categoria=${row.categoria}" class="text-decoration-none custom-gucci-card">
                        <div class="custom-card-main">
                            <img src="${catImageUrl}" class="z-n1 position-absolute">
        
                            <div class="z-0 card_hover_test">
                                <span class="animated-text">${row.categoria}</span>
                            </div>
                        </div>
                    </a>
                    `;
                });
            });
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
