import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
} from "./types";

//Get Product
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });

    dispatch(setAlert("Product Removed", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Product
export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/products", formData);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get Product
export const getProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
