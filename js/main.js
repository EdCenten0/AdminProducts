import { getProducts } from "./data/products.js";
import { getUsers } from "./data/users.js";

let dataTable;
let dataTableIsInitialized = false;

const products__section = document.querySelector(".products__section");
const categories__section = document.querySelector(".categories__section");
const products__button = document.querySelector("#products__button");
const categories__button = document.querySelector("#categories__button");
const users__button = document.querySelector("#users__button");

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

let screenQuery = () => {
  //Here i must return a number to use on
  //dataTableOptions to make it responsive
};

const dataTableOptions = {
  scrollY: "300px",
  lengthMenu: [10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
    { orderable: false, targets: [5] },
    { searchable: false, targets: [1] },
    //{ width: "50%", targets: [0] }
  ],
  pageLength: 10,
  paging: true,
  destroy: true,
  language: {
    lengthMenu: "Cuantos registros por página?: _MENU_ ",
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

    // Status: <td><i class="fa-solid fa-check" style="color: green;"></i></td>
    users.forEach((product, index) => {
      content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product?.title}</td>
                    <td>${product?.price}</td>
                    <td>${product?.description}</td>
                    <td>${product?.category?.name}</td>
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

function changeWindow(evnt) {}

categories__button.addEventListener("click", () => {
  products__section.classList.toggle("inactive");
  categories__section.classList.toggle("inactive");
});
