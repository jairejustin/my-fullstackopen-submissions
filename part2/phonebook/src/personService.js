import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
    return axios.get(baseUrl);
}

const createPerson = (personObject) => {
    return axios.post(baseUrl, personObject);
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const updatePerson = (id, newPersonObject) => {
    return axios.put(`${baseUrl}/${id}`, newPersonObject);
}

export default { 
  getAllPersons, 
  createPerson,
  deletePerson,
  updatePerson
}