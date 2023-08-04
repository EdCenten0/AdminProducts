const API = "https://api.escuelajs.co/api/v1/products";

function fetchData(urlAPI) {
  return window.fetch(urlAPI);
}

export async function getProducts() {
  const response = await window.fetch(API);
  const data = await response.json();
  return data;
}

export async function getOneProduct(productId) {
  return new Promise((resolve, reject) => {
    fetchData(`${API}/products/${productId}`)
      .then((response) => response.json())
      .then((product) => resolve(product))
      .catch((err) => reject(err));
  });
}

export async function saveProductOnAPI(bodyParam) {
  const res = await fetch(`${API}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParam),
  });

  return res;
}

export async function updateProductOnAPI(bodyParam, id) {
  const res = fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyParam),
  });

  return res;
}

export async function deleteProductOnAPI(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "appication/json",
    },
  });

  return res;
}
