//Imports
import {
  getProducts,
  saveProductOnAPI,
  updateProductOnAPI,
  deleteProductOnAPI,
} from "./data/products.js";
import {
  getCategories,
  saveCategoriesOnAPI,
  deleteCategoryOnAPI,
} from "./data/categories.js";
import { getUsers, saveUserOnAPI, deleteUserOnAPI } from "./data/users.js";

//
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
const product__form__save_button = document.querySelector(
  "#product__form__save_button"
);

const category__form__save_button = document.getElementById(
  "category__form__save_button"
);

const user__form__save_button = document.getElementById(
  "user__form__save_button"
);

const newCategories = document.querySelector(".newCategories");
const newCategories__button = document.querySelector("#newCategory__button");
const newCategories__close = document.querySelector("#newCategories__close");

const newUsers = document.querySelector(".newUsers");
const newUsers__button = document.querySelector("#newUsers__button");
const newUsers__close = document.querySelector("#newUsers__close");

// Html elements to put data
const editProducts__button = document.querySelector("#editProducts__button");
const editCategories__button = document.querySelector(
  "#editCategories__button"
);
const editUsers__button = document.querySelector("#editUsers__button");

// Html elements to delete data

const deleteProducts__panel = document.querySelector(".deleteProducts");
const deleteProducts__button = document.querySelector(
  "#deleteProducts__button"
);
const deleteProducts__close = document.querySelector("#deleteProducts__close");
const product__form__delete_button = document.getElementById(
  "product__form__delete_button"
);

const deleteCategories__panel = document.querySelector(".deleteCategories");
const deleteCategories__button = document.querySelector(
  "#deleteCategories__button"
);
const deleteCategories__close = document.querySelector(
  "#deleteCategories__close"
);
const category__form__delete_button = document.getElementById(
  "category__form__delete_button"
);

const deleteUsers__panel = document.querySelector(".deleteUsers");
const deleteUsers__button = document.querySelector("#deleteUsers__button");
const deleteUsers__close = document.querySelector("#deleteUsers__close");
const user__form__delete_button = document.getElementById(
  "user__form__delete_button"
);
//Getting data
//I most return the promise
let products = async () => getProducts();

let categories = async () => getCategories();

let users = async () => getUsers();

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
    // { width: "10%", targets: [0] },
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

//-------------------------------Create registers--------------------------------------

//panels
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
  const panelTitle = document.querySelector("#category__panelTitle");
  panelTitle.innerText = "Create a Category";

  if (document.getElementById("id__container") != null) {
    document.getElementById("id__container").remove();
  }
  newCategories.classList.toggle("inactive");
});
newCategories__close.addEventListener("click", () => {
  newCategories.classList.toggle("inactive");
});

newUsers__button.addEventListener("click", () => {
  const panelTitle = document.querySelector("#user__panelTitle");
  panelTitle.innerText = "Create a User";

  if (document.getElementById("id__container") != null) {
    document.getElementById("id__container").remove();
  }
  newUsers.classList.toggle("inactive");
});
newUsers__close.addEventListener("click", () => {
  newUsers.classList.toggle("inactive");
});

//Post products
async function saveProduct() {
  const product__save_state = document.getElementById("product__save_state");
  const form__product_title = document.getElementById("form__product_title");
  const form__product_price = document.getElementById("form__product_price");
  const form__product_description = document.getElementById(
    "form__product_description"
  );
  const form__product_categoryId = document.getElementById(
    "form__product_categoryId"
  );
  const form__product_ImageLink = document.getElementById(
    "form__product_ImageLink"
  );

  let productToSave = {
    title: `${form__product_title.value}`,
    price: `${form__product_price.value}`,
    description: `${form__product_description.value}`,
    categoryId: `${form__product_categoryId.value}`,
    images: [`${form__product_ImageLink.value}`],
  };

  const call = await saveProductOnAPI(productToSave);
  console.log(call.status);

  if (call.status === 201) {
    product__save_state.style = "color: green";
    product__save_state.innerHTML = "Product have been save";
    await initProductsDataTable();
  } else {
    let info = await call.json();
    console.log(info);
    product__save_state.style = "color: red; transition:all 1s ease;";
    product__save_state.innerHTML = "Error to save product: " + info.message;
  }
}

// product__form__save_button.addEventListener("click", () => {
//   saveProduct();
// });

// Post categories

async function saveCategories() {
  const category__save_state = document.getElementById("category__save_state");
  const form__categories_name = document.getElementById(
    "form__categories_name"
  );
  const form__categories_imageLink = document.getElementById(
    "form__categories_imageLink"
  );

  let categoryToSave = {
    name: `${form__categories_name.value}`,
    image: `${form__categories_imageLink.value}`,
  };

  const call = await saveCategoriesOnAPI(categoryToSave);

  if (call.status === 201) {
    category__save_state.style = "color: green";
    category__save_state.innerHTML = "Category have been save";
    await initCategoriesDataTable();
  } else {
    let info = await call.json();
    category__save_state.style = "color: red; transition: all 1s ease;";
    category__save_state.innerHTML = "Error to save product: " + info.message;
  }
}

category__form__save_button.addEventListener("click", () => {
  saveCategories();
});

// Post users

async function saveUsers() {
  const user__save_state = document.getElementById("user__save_state");
  const form__users_name = document.getElementById("form__users_name");
  const form__users_email = document.getElementById("form__users_email");
  const form__users_password = document.getElementById("form__users_password");
  const form__users_avatarLink = document.getElementById(
    "form__users_avatarLink"
  );

  let userToSave = {
    name: `${form__users_name.value}`,
    email: `${form__users_email.value}`,
    password: `${form__users_password.value}`,
    avatar: `${form__users_avatarLink.value}`,
  };

  const call = await saveUserOnAPI(userToSave);

  if (call.status === 201) {
    user__save_state.style = "color: green";
    user__save_state.innerHTML = "User have been save";
    await initUsersDataTable();
  } else {
    let info = await call.json();
    user__save_state.style = "color: red; transition:all 1s ease;";
    user__save_state.innerHTML = "Error to save product: " + info.message;
  }
}

user__form__save_button.addEventListener("click", () => {
  saveUsers();
});

//-----------------------------Edit registers----------------------------------------

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
    inputField.setAttribute("id", `form__${sectionName}_id`);

    idField.append(labelField, inputField);
    form.insertBefore(idField, form.firstChild);
  }
}

editProducts__button.addEventListener("click", () => {
  setEditPanel("product");
  newProducts.classList.toggle("inactive");
});
editCategories__button.addEventListener("click", () => {
  setEditPanel("category");
  newCategories.classList.toggle("inactive");
});
editUsers__button.addEventListener("click", () => {
  setEditPanel("user");
  newUsers.classList.toggle("inactive");
});

//Edit products

async function editProduct() {
  const product__save_state = document.getElementById("product__save_state");
  const form__product_title = document.getElementById("form__product_title");
  const form__product_price = document.getElementById("form__product_price");
  const form__product_description = document.getElementById(
    "form__product_description"
  );
  const form__product_categoryId = document.getElementById(
    "form__product_categoryId"
  );
  const form__product_ImageLink = document.getElementById(
    "form__product_ImageLink"
  );
  const form__product_id = document.getElementById("form__product_id");

  // let productToSave = {
  //   title: `${form__product_title.value}`,
  //   price: `${form__product_price.value}`,
  //   description: `${form__product_description.value}`,
  //   categoryId: `${form__product_categoryId.value}`,
  //   images: [`${form__product_ImageLink.value}`],
  // };

  let productToSave = {};

  if (!form__product_title.value.length == 0) {
    productToSave.title = form__product_title.value;
  }
  if (!form__product_price.value.length == 0) {
    productToSave.price = form__product_price.value;
  }
  if (!form__product_description.value.length == 0) {
    productToSave.description = form__product_description.value;
  }
  if (!form__product_categoryId.value.length == 0) {
    productToSave.categoryId = form__product_categoryId.value;
  }
  if (!form__product_ImageLink.value.length == 0) {
    productToSave.images = [form__product_ImageLink.value];
  }

  const call = await updateProductOnAPI(productToSave, form__product_id.value);
  if (call.status === 200) {
    console.log(await call.json());
    product__save_state.style = "color:green";
    product__save_state.innerHTML = "Product has been edited succesfully";
    await initProductsDataTable();
  } else {
    let info = await call.json();
    product__save_state.style = "color:red; transition:all 1s ease;";
    product__save_state.innerHTML = "Error to edit product: " + info.message;
  }
  console.log(call.status);
}

product__form__save_button.addEventListener("click", () => {
  editProduct();
});

// -------------------------------------Delete registers--------------------------------

deleteProducts__button.addEventListener("click", () => {
  deleteProducts__panel.classList.toggle("inactive");
});
deleteProducts__close.addEventListener("click", () => {
  deleteProducts__panel.classList.toggle("inactive");
});

deleteCategories__button.addEventListener("click", () => {
  deleteCategories__panel.classList.toggle("inactive");
});
deleteCategories__close.addEventListener("click", () => {
  deleteCategories__panel.classList.toggle("inactive");
});

deleteUsers__button.addEventListener("click", () => {
  deleteUsers__panel.classList.toggle("inactive");
});
deleteUsers__close.addEventListener("click", () => {
  deleteUsers__panel.classList.toggle("inactive");
});

//Delete products

async function deleteProduct() {
  const product__delete_state = document.getElementById(
    "product__delete_state"
  );
  const form__product__delete__id = document.getElementById(
    "form__product__delete__id"
  );

  const call = await deleteProductOnAPI(form__product__delete__id.value);
  console.log("call:" + call.status);

  if (call.status === 200) {
    product__delete_state.style = "color:green";
    product__delete_state.innerHTML = "Product has been deleted succesfully";
    await initProductsDataTable();
  } else {
    let info = await call.json();
    console.log(info);
    product__delete_state.style = "color: red; transition:all 1s ease;";
    product__delete_state.innerHTML =
      "Error on deleting product: " + info.message;
  }
}

product__form__delete_button.addEventListener("click", () => {
  deleteProduct();
});

//Delete categories

async function deleteCategory() {
  const category__delete_state = document.getElementById(
    "category__delete_state"
  );
  const form__category__delete__id = document.getElementById(
    "form__category__delete__id"
  );

  const call = await deleteCategoryOnAPI(form__category__delete__id.value);

  console.log("call:" + call.status);

  if (call.status === 200) {
    category__delete_state.style = "color: green";
    category__delete_state.innerHTML = "Category has been deleted succesfully";
    await initCategoriesDataTable();
  } else {
    let info = await call.json();
    category__delete_state.style = "color:red; transition: all 1s ease;";
    category__delete_state.innerHTML =
      "Error on deleting category: " + info.message;
  }
}

category__form__delete_button.addEventListener("click", () => {
  deleteCategory();
});

//Delete users
async function deleteUser() {
  const user__delete_state = document.getElementById("user__delete_state");
  const form__user__delete__id = document.getElementById(
    "form__user__delete__id"
  );

  const call = await deleteUserOnAPI(form__user__delete__id.value);

  console.log("call:" + call.status);
  if (call.status === 200) {
    user__delete_state.style = "color: green";
    user__delete_state.innerHTML = "User has been deleted succesfully";
    await initUsersDataTable();
  } else {
    let info = await call.json();
    user__delete_state.style = "color: red; transition:all 1s ease;";
    user__delete_state.innerHTML = "Error on deleting user: " + info.message;
  }
}

user__form__delete_button.addEventListener("click", () => {
  deleteUser();
});
