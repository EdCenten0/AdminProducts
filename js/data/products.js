const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlAPI) {
  return window.fetch(urlAPI);
}

export async function getProducts() {
  return new Promise((resolve, reject) => {
    fetchData(`${API}/products`)
      .then((response) => response.json())
      .then((products) => resolve(products))
      .catch((err) => reject(err));
  });
}

export async function getOneProduct(productId) {
  return new Promise((resolve, reject) => {
    fetchData(`${API}/products/${productId}`)
      .then((response) => response.json())
      .then((product) => resolve(product))
      .catch((err) => reject(err));
  });
}
