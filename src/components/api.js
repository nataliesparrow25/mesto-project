let parameters = {};

export function getData(url) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
    });
}

export function putData(url) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
    },
    method: "PUT", // нужно указать метод запроса
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
    });
}

export function updateData(url, data) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "PATCH", // нужно указать метод запроса
    // тело запроса
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
    });
}

export function createData(url, data) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: "POST", // нужно указать метод запроса
    // тело запроса
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
    });
}

export function deleteData(url) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
    },
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`); // "Что-то пошло не так: ..."
    });
}

export function enableApi(params) {
  parameters = params;
}
