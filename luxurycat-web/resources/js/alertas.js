var botonesAbrirModal = document.querySelectorAll('.editar');
botonesAbrirModal.forEach(function (boton) {
  boton.addEventListener('click', function () {
    var modal = new bootstrap.Modal(document.getElementById('saveModal'));
    modal.show();
  });
});

var elementosEliminar = document.querySelectorAll('.eliminar');
elementosEliminar.forEach(function (elemento) {
  elemento.addEventListener('click', function () {
    swal({
      title: "Eliminado correctamente!",
      text: "El elemento se ha eliminado",
      icon: "success",
      button: "Aceptar"
    });
  });
});

// Obtener todos los elementos con la clase .info
var elements = document.querySelectorAll('.info');

// Iterar sobre cada elemento y añadir un event listener
elements.forEach(function(element) {
  element.addEventListener('click', function() {
    // Obtener el modal por su ID y mostrarlo
    var modal = document.getElementById('saveModal');
    var modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  });
});