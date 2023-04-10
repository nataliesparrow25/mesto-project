let parameters = {};

import { checkResponse } from "./utils";

export function getData(url) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
    },
  })
    .then(checkResponse)
}

export function putData(url) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
    },
    method: "PUT", // нужно указать метод запроса
  })
    .then(checkResponse)
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
    .then(checkResponse)
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
  }).then(checkResponse);
}

export function deleteData(url) {
  return fetch(`${parameters.baseUrl}/${parameters.cohort}/${url}`, {
    headers: {
      authorization: parameters.authToken,
    },
    method: "DELETE",
  })
    .then(checkResponse)
}

export function enableApi(params) {
  parameters = params;
}
