import axios from "axios";

const API_URL = "http://localhost:8080/";
const countUrl = `${API_URL}count/counts?id=1`;
const saveCustomerDataUrl = `${API_URL}customer/save`;

export const getInvoiceNumberService = async () => {
  try {
    return await axios.get(countUrl);
  } catch (error) {
    console.log("Error while calling getListOfRecors api", error.message);
  }
};
export const saveCustomerDataService = async (data) => {
  debugger;
  try {
    return await axios.post(saveCustomerDataUrl, data);
  } catch (error) {
    console.log("Error while calling getListOfRecors api", error.message);
  }
};
