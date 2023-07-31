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

  const data = await res.json();
  console.log(res);

  if (res.status !== 201) {
    console.log("error:" + res.status + data.message);
    return true;
  } else {
    console.log("error:" + res.status + data.message);
    return false;
  }
}

export async function deleteProductOnAPI(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "appication/json",
    },
  });

  const data = await res.json();
  console.log(res);

  if (res.ok) {
    return res;
  } else {
    console.log("error:" + res.status + data.message);
    return false;
  }
}
