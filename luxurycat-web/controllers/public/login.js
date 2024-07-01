// Constante para establecer el formulario de iniciar sesión.
const SESSION_FORM = document.getElementById('sessionForm');
const imagenLogin = document.getElementById('imagenLogin');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    try {
        const randomCatImageUrl = await getRandomCatImage();
        if (randomCatImageUrl) {
            imagenLogin.src = randomCatImageUrl;
        } else {
            // Si la API no devuelve una imagen, podrías establecer una imagen de respaldo aquí.
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Método del evento para cuando se envía el formulario de iniciar sesión.
SESSION_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SESSION_FORM);
    // Petición para determinar si el cliente se encuentra registrado.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

function getRandomCatImage() {
    return fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => data[0].url)
        .catch(error => {
            console.error('Error fetching the cat image:', error);
            return null;
        });
}
