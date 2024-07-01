


const USER_API = "services/admin/administrador.php";
document.querySelector("title").textContent = "LuxuryCat - Dashboard";

/*  Función asíncrona para cargar el encabezado y pie del documento.
 *   Parámetros: ninguno.
 *   Retorno: ninguno.
 */
const loadTemplate = async () => {
  // Petición para obtener en nombre del usuario que ha iniciado sesión.
  const DATA = await fetchData(USER_API, "getUser");
  // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
  if (DATA.session) {
    // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status && !location.pathname.endsWith("index.html")) {
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
              <a href="dashboard.html" id="sidebar-cat-dashboard">
                <ion-icon name="grid-outline"></ion-icon>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="productos.html" id="sidebar-cat-productos">
                <ion-icon name="bag-outline"></ion-icon>
                <span>Productos</span>
              </a>
            </li>
            <li>
              <a href="categorias.html" id="sidebar-cat-categorias">
                <ion-icon name="duplicate-outline"></ion-icon>
                <span>Categorías</span>
              </a>
            </li>
            <li>
              <a href="marca.html" id="sidebar-cat-marcas">
                <ion-icon name="storefront-outline"></ion-icon>
                <span>Marcas</span>
              </a>
            </li>
            <li>
              <a href="administradores.html" id="sidebar-cat-administradores">
                <ion-icon name="medical-outline"></ion-icon>
                <span>Administradores</span>
              </a>
            </li>
            <li>
              <a href="pedidos.html" id="sidebar-cat-pedidos">
                <ion-icon name="albums-outline"></ion-icon>
                <span>Pedidos</span>
              </a>
            </li>
            <li>
              <a href="clientes.html" id="sidebar-cat-clientes">
                <ion-icon name="people-outline"></ion-icon>
                <span>Pedidos</span>
              </a>
            </li>
            <li>
            <a href="comentarios.html" id="sidebar-cat-comentarios">
              <ion-icon name="star-outline"></ion-icon>
              <span>Comentarios</span>
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
      </div>`;
      
      loadTemplateJs();
      loadTemplateSelection();
      
    } else {
      sweetAlert(3, DATA.error, false, "index.html");
    }
  } else {
    // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
    if (!location.pathname.endsWith("index.html")) {
      location.href = "index.html";
    } else {
      console.log("Logged")
    }
  }
};



const loadTemplateSelection = async () => {
  const sidebarMap = {
    dashboard: "sidebar-cat-dashboard",
    categorias: "sidebar-cat-categorias",
    administradores: "sidebar-cat-administradores",
    clientes: "sidebar-cat-clientes",
    marca: "sidebar-cat-marcas",
    pedidos: "sidebar-cat-pedidos",
    productos: "sidebar-cat-productos",
    comentarios: "sidebar-cat-comentarios"
  };
  var bodyId = document.body.id; // Aquí puedes obtener el bodyId de alguna manera, ya sea a través de un parámetro de la función o de otra fuente.

  const sidebarElementId = sidebarMap[bodyId];
  if (sidebarElementId) {
    document.getElementById(sidebarElementId).classList.add("selected");
  }
};





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

