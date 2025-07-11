import axios from "./axiosInstance";

// Fetch all products
export const getAllProducts = async () => {
  const response = await axios.get("/products/all");
  return response.data;
};

// Buy selected products
export const buyProducts = async (cart) => {
  const response = await axios.post("/buyer/buy", cart);
  return response.data;
};
