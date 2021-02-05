import { GET_UNIVERSITY, ERR_GET_UNIVERSITY } from "../action/types";

const initialState = {
  universities: null,
  profiles: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_UNIVERSITY:
      return {
        ...state,
        universities: payload,
        loading: false,
      };
    case ERR_GET_UNIVERSITY:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
