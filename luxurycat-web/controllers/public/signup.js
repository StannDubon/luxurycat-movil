// Constante para establecer el formulario de registrar cliente.
const SIGNUP_FORM = document.getElementById('signupForm');
const imagenLogin = document.getElementById('imagenSignup');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
});

// Cuando se carga la página, obtenemos una imagen aleatoria y la asignamos al src de la etiqueta img
document.addEventListener('DOMContentLoaded', async () => {
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

// Método del evento para cuando se envía el formulario de registrar cliente.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'login.html');
    } else if (DATA.recaptcha) {
        sweetAlert(2, DATA.error, false, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
    }
});

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function reCAPTCHA() {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6LdBzLQUAAAAAJvH-aCUUJgliLOjLcmrHN06RFXT';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, { action: 'homepage' }).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    });
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
