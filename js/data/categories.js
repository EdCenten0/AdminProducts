const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlAPI) {
  return window.fetch(urlAPI);
}

export async function getCategories() {
  return new Promise((resolve, reject) => {
    fetchData(`${API}/categories`)
      .then((response) => response.json())
      .then((categories) => resolve(categories))
      .catch((err) => console.log(err));
  });
}

export async function getOneCategories(categoryId) {
  return new Promise((resolve, reject) => {
    fetchData(`${API}/categories/${categoryId}`)
      .then((response) => response.json())
      .then((product) => resolve(product))
      .catch((err) => reject(err));
  });
}
