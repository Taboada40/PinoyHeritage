import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:8080/api/admin/products",
});

export default productsApi;