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

// Html elements to post data
const newProducts = document.querySelector(".newProducts");
const newProducts__button = document.querySelector("#newProducts__button");
const newProducts__close = document.querySelector("#newProducts__close");

const newCategories = document.querySelector(".newCategories");
const newCategories__button = document.querySelector("#newCategory__button");
const newCategories__close = document.querySelector("#newCategories__close");

const newUsers = document.querySelector(".newUsers");
const newUsers__button = document.querySelector("#newUsers__button");
const newUsers__close = document.querySelector("#newUsers__close");

// Html elements to put data
const editProducts__button = document.querySelector("#editProducts__button");

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

//Create registers panels events
newProducts__button.addEventListener("click", () => {
  const panelTitle = document.querySelector("#product__panelTitle");
  panelTitle.innerText = "Create a product";

  if (document.getElementById("id__container") != null) {
    document.getElementById("id__container").remove();
  }
  newProducts.classList.toggle("inactive");
});
newProducts__close.addEventListener("click", () => {
  newProducts.classList.toggle("inactive");
});

newCategories__button.addEventListener("click", () => {
  newCategories.classList.toggle("inactive");
});
newCategories__close.addEventListener("click", () => {
  newCategories.classList.toggle("inactive");
});

newUsers__button.addEventListener("click", () => {
  newUsers.classList.toggle("inactive");
});
newUsers__close.addEventListener("click", () => {
  newUsers.classList.toggle("inactive");
});

//Edit registers

function setEditPanel(sectionName) {
  const panelTitle = document.querySelector(`#${sectionName}__panelTitle`);
  const form = document.querySelector(`#${sectionName}__form`);
  panelTitle.innerText = `Edit a ${sectionName}`;

  if (document.getElementById("id__container") == null) {
    const idField = document.createElement("p");
    const labelField = document.createElement("label");
    const inputField = document.createElement("input");

    labelField.innerText = "ID";
    idField.setAttribute("id", "id__container");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("id", `form__${sectionName}__id`);

    idField.append(labelField, inputField);
    form.insertBefore(idField, form.firstChild);
  }

  newProducts.classList.toggle("inactive");
}

editProducts__button.addEventListener("click", () => setEditPanel("product"));
