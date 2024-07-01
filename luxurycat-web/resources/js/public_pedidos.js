// Obtener todos los botones de "Mostrar Más/Menos"
const toggleTableBtns = document.querySelectorAll('.toggle-table-btn');

// Recorrer cada botón y asignar el evento click
toggleTableBtns.forEach(btn => {
    const tableId = btn.dataset.target;
    const invoiceTable = document.getElementById(tableId);
    invoiceTable.classList.add('d-none');

    btn.addEventListener('click', function () {
        if (invoiceTable.classList.contains('d-none')) {
            invoiceTable.classList.remove('d-none');
            btn.textContent = 'Mostrar Menos';
        } else {
            invoiceTable.classList.add('d-none');
            btn.textContent = 'Mostrar Más';
        }
    });
});
