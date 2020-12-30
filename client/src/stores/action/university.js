import axios from "axios";
import { setAlert } from "./alert";

import { GET_UNIVERSITY, ERR_GET_UNIVERSITY } from "./types";

// GET Current User's Profile

export const getUniversity = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/university");
    dispatch({
      type: GET_UNIVERSITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERR_GET_UNIVERSITY,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
