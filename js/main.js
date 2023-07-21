//Imports
import { getProducts } from "./data/products.js";
import { getCategories } from "./data/categories.js";
import { getUsers } from "./data/users.js";

//Datatable
let dataTable = {
  products: undefined,
  categories: undefined,
  users: undefined,
};

let dataTableIsInitialized = {
  products: false,
  categories: false,
  users: false,
};

//Html elements
// Sections
const products__section = document.querySelector(".products__section");
const categories__section = document.querySelector(".categories__section");
const users__section = document.querySelector(".users__section");
const products__button = document.getElementById("products__button");
const categories__button = document.getElementById("categories__button");
const users__button = document.getElementById("users__button");

// Panels to post data
const newProducts = document.querySelector(".newProducts");
const newProducts__button = document.querySelector("#newProducts__button");
const newProducts__close = document.querySelector("#newProducts__close");

const newCategories = document.querySelector(".newCategories");
// const newProducts__button = document.querySelector("#newProducts__button");
// const newProducts__close = document.querySelector("#newProducts__close");

console.log(newProducts__button);
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
    .then((APIcategories) => {
      return APIcategories;
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
    { className: "centered" },
    { orderable: true },
    { searchable: true },
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

const initProductsDataTable = async () => {
  if (dataTableIsInitialized.products) {
    dataTable.products.destroy();
  }
  await listProducts();
  dataTable.products = $("#datatable_products").DataTable(dataTableOptions);
  dataTableIsInitialized.products = true;
};

const initCategoriesDataTable = async () => {
  if (dataTableIsInitialized.categories) {
    dataTable.categories.destroy();
  }
  await listCategories();
  dataTable.categories = $("#datatable_categories").DataTable(dataTableOptions);
  dataTableIsInitialized.categories = true;
};

const initUsersDataTable = async () => {
  if (dataTableIsInitialized.users) {
    dataTable.users.destroy();
  }
  await listUsers();
  dataTable.users = $("#datatable_users").DataTable(dataTableOptions);
  dataTableIsInitialized.users = true;
};

const listProducts = async () => {
  try {
    //I must call function with await
    const productsToTable = await products();

    let content = ``;

    // Status: <td><i class="fa-solid fa-check" style="color: green;"></i></td>
    productsToTable.forEach((product, index) => {
      content += `
                <tr >
                    <td>${index + 1}</td>
                    <td>${product?.id}</td>
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

const listCategories = async () => {
  try {
    const categoriesToTable = await categories();
    let content = ``;

    categoriesToTable.forEach((category, index) => {
      content += `<tr>
                      <td>${index + 1}</td>
                      <td>${category?.id}</td>
                      <td>${category?.name}</td>
                      <td>${category?.image}</td>
                      <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                  </tr>`;
    });
    tableBody_categories.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

const listUsers = async () => {
  try {
    const usersTotable = await users();
    let content = ``;

    usersTotable.forEach((user, index) => {
      content += `<tr>
                    <td>${index + 1}</td>
                    <td>${user?.id}</td>
                    <td>${user?.email}</td>
                    <td>${user?.password}</td>
                    <td>${user?.name}</td>
                    <td>${user?.role}</td>
                    <td>${user?.avatar}</td>
                  </tr>
      `;
    });
    tableBody_users.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

window.addEventListener("load", async () => {
  await initProductsDataTable();
  await initCategoriesDataTable();
  await initUsersDataTable();
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

newProducts__button.addEventListener("click", () => {
  newProducts.classList.toggle("inactive");
});
newProducts__close.addEventListener("click", () => {
  newProducts.classList.toggle("inactive");
});
