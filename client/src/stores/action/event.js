import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_EVENT,
  GET_EVENT,
  GET_EVENTS,
  DELETE_EVENT,
  EVENT_ERROR,
} from "./types";

//Get Product
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/events");

    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Product
export const deleteEvent = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });

    dispatch(setAlert("Event Removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Product
export const addEvent = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/events", formData);
    dispatch({
      type: ADD_EVENT,
      payload: res.data,
    });

    dispatch(setAlert("Event Added", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get Product
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
