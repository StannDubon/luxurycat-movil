/*
*   Controlador es de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/public/cliente.php';
// Se establece el título de la página web.
document.querySelector('title').textContent = 'LuxuryCat - Store';
// Constante para establecer el elemento del título principal.


/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
  // Petición para obtener en nombre del usuario que ha iniciado sesión.
  const DATA = await fetchData(USER_API, 'getUser');
  // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
  if (DATA.session) {
    // Se verifica si la página web no es el inicio de sesión, de lo contrario se direcciona a la página web principal.
    if (!location.pathname.endsWith('login.html')) {
      // Se agrega el encabezado de la página web antes del contenido principal.
      document.querySelector("header").innerHTML = `
            <div class="menu">
            <ion-icon name="menu-outline"></ion-icon>
            <ion-icon name="close-outline"></ion-icon>
            </div>
            
            <div class="barra-lateral">
            <div>
              <div class="nombre-pagina">
                <img
                  src="../../resources/svg/logo.svg"
                  alt=""
                  id="cloud"
                  name="cloud-outline"
                />
                <span>LuxuryCat</span>
              </div>
            </div>
            
            <nav class="navegacion">
              <ul class="ul-fixed">
                <li>
                  <a href="index.html" id="sidebar-cat-marcas">
                    <ion-icon name="storefront-outline"></ion-icon>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="carrito.html" id="sidebar-cat-dashboard">
                    <ion-icon name="grid-outline"></ion-icon>
                    <span>Carrito</span>
                  </a>
                </li>
                <li>
                  <a href="categorias.html" id="sidebar-cat-productos">
                    <ion-icon name="bag-outline"></ion-icon>
                    <span>Categorias</span>
                  </a>
                </li>
                <li>
                  <a href="quienes_somos.html" id="sidebar-cat-categorias">
                    <ion-icon name="duplicate-outline"></ion-icon>
                    <span>Blog</span>
                  </a>
                </li>
            
                <li>
                  <a href="pedidos.html" id="sidebar-cat-administradores">
                    <ion-icon name="medical-outline"></ion-icon>
                    <span>Pedidos</span>
                  </a>
                </li>
                <li>
                <a href="perfil.html" id="sidebar-cat-administradores">
                  <ion-icon name="medical-outline"></ion-icon>
                  <span>Perfil</span>
                </a>
              </li>
              </ul>
            </nav>
            
            <div>
              <div class="linea"></div>
            
              <div class="modo-oscuro">
                <div class="info">
                  <ion-icon name="moon-outline"></ion-icon>
                  <span>Dark Mode</span>
                </div>
                <div class="switch">
                  <div class="base">
                    <div class="circulo"></div>
                  </div>
                </div>
              </div>
            
              <div class="usuario" >
                <a onclick="logOut()" class="logout_button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff;"><path d="m2 12 5 4v-3h9v-2H7V8z"></path><path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path></svg>
                </a>
              </div>
            </div>
            </div>
          `;
          loadTemplateJs(); 
    } else {
      location.href = 'index.html';
    }
  } else {

    

    if (!(location.pathname.endsWith("signup.html") || location.pathname.endsWith("login.html"))) {
      // Se agrega el encabezado de la página web antes del contenido principal.
      document.querySelector("header").innerHTML = `
        <div class="menu">
        <ion-icon name="menu-outline"></ion-icon>
        <ion-icon name="close-outline"></ion-icon>
        </div>
        
        <div class="barra-lateral">
        <div>
          <div class="nombre-pagina">
            <img
              src="../../resources/svg/logo.svg"
              alt=""
              id="cloud"
              name="cloud-outline"
            />
            <span>LuxuryCat</span>
          </div>
        </div>
        
        <nav class="navegacion">
          <ul class="ul-fixed">
            <li>
              <a href="index.html" id="sidebar-cat-marcas">
                <ion-icon name="storefront-outline"></ion-icon>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="categorias.html" id="sidebar-cat-productos">
                <ion-icon name="bag-outline"></ion-icon>
                <span>Categorias</span>
              </a>
            </li>
            <li>
              <a href="quienes_somos.html" id="sidebar-cat-categorias">
                <ion-icon name="duplicate-outline"></ion-icon>
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div>
          <div class="linea"></div>
        
          <div class="modo-oscuro">
            <div class="info">
              <ion-icon name="moon-outline"></ion-icon>
              <span>Dark Mode</span>
            </div>
            <div class="switch">
              <div class="base">
                <div class="circulo"></div>
              </div>
            </div>
          </div>
        
          <div class="usuario" >
            <a href="login.html" class="logout_button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
            </a>
          </div>
        </div>
        </div>
          `;
      loadTemplateJs();
    }

    if(location.pathname.endsWith("perfil.html") || location.pathname.endsWith("pedidos.html") || location.pathname.endsWith("carrito.html")){
      location.href = 'index.html';
    }
  }

  if(!(location.pathname.endsWith("signup.html") || location.pathname.endsWith("login.html") || location.pathname.endsWith("perfil.html"))){
  // Se agrega el pie de la página web después del contenido principal.
  document.querySelector("footer").innerHTML = `
  <div class="footer_area section_padding-130_0">
  <div class="container">
      <div class="row">
          <!-- Single Widget-->
          <div class="col-12 col-sm-6 col-lg-4">
              <div class="single-footer-widget section_padding_0_130">
                  <!-- Footer Logo-->
                  <div class="footer-logo mb-3"></div>
                  <p>Búscanos en todas las redes sociales</p>
                  <!-- Copywrite Text-->
                  <div class="copywrite-text mb-5">
                      <p>Facebook, Pinterest, Skype y Twitter:</p>
                  </div>
                  <!-- Footer Social Area-->
                  <div class="footer_social_area mb-5">
                      <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook">
                          <img src="../../resources/svg/facebook.svg" width="40vm">
                          <i class="fa fa-facebook"></i>
                      </a>
                      <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest">
                          <img src="../../resources/svg/pinterest.svg" width="30vm">
                          <i class="fa fa-pinterest"></i>
                      </a>
                      <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype">
                          <img src="../../resources/svg/skype.svg" width="30vm">
                          <i class="fa fa-skype"></i>
                      </a>
                      <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
                          <img src="../../resources/svg/twitter.svg" width="30vm">
                          <i class="fa fa-twitter"></i>
                      </a>
                  </div>
              </div>
          </div>
          <!-- Single Widget-->
          <div class="col-12 col-sm-6 col-lg">
              <div class="single-footer-widget section_padding_0_130">
                  <!-- Widget Title-->
                  <h5 class="widget-title">Acerca de</h5>
                  <!-- Footer Menu-->
                  <div class="footer_menu">
                      <ul>
                          <li><a href="#">Sobre Nosotros</a></li>
                          <li><a href="#">Venta Corporativa</a></li>
                          <li><a href="#">Términos y Política</a></li>
                          <li><a href="#">Comunidad</a></li>
                      </ul>
                  </div>
              </div>
          </div>
          <!-- Single Widget-->
          <div class="col-12 col-sm-6 col-lg">
              <div class="single-footer-widget section_padding_0_130">
                  <!-- Widget Title-->
                  <h5 class="widget-title">Soporte</h5>
                  <!-- Footer Menu-->
                  <div class="footer_menu">
                      <ul>
                          <li><a href="#">Ayuda</a></li>
                          <li><a href="#">Soporte</a></li>
                          <li><a href="#">Política de Privacidad</a></li>
                          <li><a href="#">Términos y Condiciones</a></li>
                          <li><a href="#">Ayuda y Soporte</a></li>
                      </ul>
                  </div>
              </div>
          </div>
          <!-- Single Widget-->
          <div class="col-12 col-sm-6 col-lg">
              <div class="single-footer-widget section_padding_0_130">
                  <!-- Widget Title-->
                  <h5 class="widget-title">Contacto</h5>
                  <!-- Footer Menu-->
                  <div class="footer_menu">
                      <ul>
                          <li><a href="#">Centro de Llamadas</a></li>
                          <li><a href="#">Contáctanos por Email</a></li>
                          <li><a href="#">Términos y Condiciones</a></li>
                          <li><a href="#">Centro de Ayuda</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>`;
  }

}


const loadTemplateJs = async () => {
  const cloud = document.getElementById("cloud");
  const barraLateral = document.querySelector(".barra-lateral");
  const spans = document.querySelectorAll("span");
  const palanca = document.querySelector(".switch");
  const circulo = document.querySelector(".circulo");
  const menu = document.querySelector(".menu");
  const main = document.querySelector("main");

  barraLateral.classList.toggle("mini-barra-lateral");
  main.classList.toggle("min-main");
  spans.forEach((span) => {
    span.classList.toggle("oculto");
  });

  menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral.classList.contains("max-barra-lateral")) {
      menu.children[0].style.display = "none";
      menu.children[1].style.display = "block";
    } else {
      menu.children[0].style.display = "block";
      menu.children[1].style.display = "none";
    }
    if (window.innerWidth <= 320) {
      barraLateral.classList.add("mini-barra-lateral");
      main.classList.add("min-main");
      spans.forEach((span) => {
        span.classList.add("oculto");
      });
    }
  });

  palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("");
    circulo.classList.toggle("prendido");
  });

  cloud.addEventListener("click", () => {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach((span) => {
      span.classList.toggle("oculto");
    });
  });



};
