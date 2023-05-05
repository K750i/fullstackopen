import axios from 'axios';

const baseURL = '/api/persons';

function getAll() {
  return axios
    .get(baseURL)
    .then(response => response.data);
}

function create(person) {
  return axios
    .post(baseURL, person)
    .then(response => response.data);
}

function deletePerson(id) {
  axios.delete(`${baseURL}/${id}`);
}

function updatePhone(id, newObj) {
  return axios
    .put(`${baseURL}/${id}`, newObj)
    .then(response => response.data);
}

export default {
  getAll,
  create,
  deletePerson,
  updatePhone,
};