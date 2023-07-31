const API = "https://api.escuelajs.co/api/v1/users";

function fetchData(urlAPI) {
  return window.fetch(urlAPI);
}

export async function getUsers() {
  const response = await window.fetch(API);
  const data = await response.json();
  return data;
}

export async function getOneUser(userId) {
  return new Promise((resolve, reject) => {
    fetchData(`${API}/users/${userId}`)
      .then((response) => response.json())
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

export async function saveUserOnAPI(bodyParam) {
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

export async function deleteUserOnAPI(id) {
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
