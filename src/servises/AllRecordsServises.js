import axios from "axios";

const API_URL = "http://localhost:8080/customer/";
const LIST_ITEM = `${API_URL}listcustomer`;
const DELETE_ITEM = `${API_URL}deletebyid`;

export const getListOfRecords = async () => {
  try {
    return await axios.get(LIST_ITEM);
  } catch (error) {
    console.log("Error while calling getListOfRecors api", error.message);
  }
};

export const deleteRecordById = async (id) => {
  try {
    return await axios.get(`${DELETE_ITEM}?id=${id}`);
  } catch (error) {
    console.log("Error while calling getListOfRecors api", error.message);
  }
};
