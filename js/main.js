import { getProducts } from "./data/products.js";
import { getUsers } from "./data/users.js";

//I most return the promise
let products = () => {
  return getProducts()
    .then((APIproducts) => {
      return APIproducts;
    })
    .catch((err) => {
      console.log(err);
    });
};

let users = () => {
  return getUsers()
    .then((APIusers) => {
      return APIusers;
    })
    .catch((err) => {
      console.log(err);
    });
};

let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
    { orderable: false, targets: [5, 6] },
    { searchable: false, targets: [1] },
    //{ width: "50%", targets: [0] }
  ],
  pageLength: 3,
  destroy: true,
  language: {
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "Ningún usuario encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún usuario encontrado",
    infoFiltered: "(filtrados desde _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
};

const initDataTable = async () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  await listProducts();

  dataTable = $("#datatable_users").DataTable(dataTableOptions);

  dataTableIsInitialized = true;
};

const listProducts = async () => {
  try {
    //I must call function with await
    const users = await products();

    let content = ``;
    users.forEach((product, index) => {
      content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product?.title}</td>
                    <td>${product?.price}</td>
                    <td>${product?.description}</td>
                    <td>${product?.category?.name}</td>
                    <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                    <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
    });
    tableBody_products.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

window.addEventListener("load", async () => {
  await initDataTable();
});
