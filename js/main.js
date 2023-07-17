//Imports
import { getProducts } from "./data/products.js";
import { getCategories } from "./data/categories.js";
import { getUsers } from "./data/users.js";

//Datatable
let dataTable = [undefined, undefined, undefined];
let dataTableIsInitialized = false;

//Html elements
const products__section = document.querySelector(".products__section");
const categories__section = document.querySelector(".categories__section");
const users__section = document.querySelector(".users__section");
const products__button = document.getElementById("products__button");
const categories__button = document.getElementById("categories__button");
const users__button = document.getElementById("users__button");

//Getting data
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

let categories = () => {
  return getCategories()
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
  //Here i will return a number to use on
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
    zeroRecords: "Ningún registro encontrado",
    info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
    infoEmpty: "Ningún registro encontrado",
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
    dataTable[0].destroy();
  }

  await listProducts();

  dataTable[0] = $("#datatable_products").DataTable(dataTableOptions);

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

function changePanel(event) {
  // console.log(event.target.id);
  let isProductsPanelActive = !products__section.classList.contains("inactive");
  let isCategoriesPanelActive =
    !categories__section.classList.contains("inactive");
  let isUsersPanelActive = !users__section.classList.contains("inactive");

  if (isProductsPanelActive && event.target.id == "categories__button") {
    products__section.classList.add("inactive");
    categories__section.classList.remove("inactive");
  } else if (isProductsPanelActive && event.target.id == "users__button") {
    products__section.classList.add("inactive");
    users__section.classList.remove("inactive");
  } else if (isCategoriesPanelActive && event.target.id == "products__button") {
    categories__section.classList.add("inactive");
    products__section.classList.remove("inactive");
  } else if (isCategoriesPanelActive && event.target.id == "users__button") {
    categories__section.classList.add("inactive");
    users__section.classList.remove("inactive");
  } else if (isUsersPanelActive && event.target.id == "products__button") {
    users__section.classList.add("inactive");
    products__section.classList.remove("inactive");
  } else if (isUsersPanelActive && event.target.id == "categories__button") {
    users__section.classList.add("inactive");
    categories__section.classList.remove("inactive");
  }
}

products__button.addEventListener("click", changePanel);
categories__button.addEventListener("click", changePanel);
users__button.addEventListener("click", changePanel);
