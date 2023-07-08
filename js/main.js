import { getProducts } from "./data/products.js";
import { getUsers } from "./data/users.js";

const produtcsTable = document.querySelector("#tableBody_products");

let products = await getProducts()
  .then((APIproducts) => {
    return APIproducts;
  })
  .catch((err) => {
    console.log(err);
  });

let users = await getUsers()
  .then((APIusers) => {
    return APIusers;
  })
  .catch((err) => {
    console.log(err);
  });

const listProducts = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const responseProducts = response.json();

    let content = ``;
    responseProducts.forEach((product, index) => {
      content += `
                <tr>
                    <td>${index + 1}</td>
            </tr>`;
    });

    produtcsTable.innerHTML = content;
  } catch (ex) {
    console.log(ex);
  }
};

window.addEventListener("load", async () => {
  await listProducts();
});
