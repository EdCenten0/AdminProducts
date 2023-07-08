
const API =  'https://api.escuelajs.co/api/v1'

function fetchData(urlAPI){
    return window.fetch(urlAPI);
}

export async function getUsers(){
    return new Promise((resolve, reject) => {
        fetchData(`${API}/users`)
            .then((response) => response.json())
            .then((users) => resolve(users))
            .catch((err) => reject(err));
    });
}

export async function getOneUser(userId){
    return new Promise((resolve, reject) =>{
        fetchData(`${API}/users/${userId}`)
            .then((response) => response.json())
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });
}
