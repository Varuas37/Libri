import {
  ADD_EVENT,
  GET_EVENT,
  GET_EVENTS,
  DELETE_EVENT,
  EVENT_ERROR,
} from "../action/types";
const initialState = {
  events: [],
  event: null,
  event_loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        event_loading: false,
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
        event_loading: false,
      };

    case GET_EVENT:
      return {
        ...state,
        event: payload,
        event_loading: false,
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
        event_loading: false,
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        event_loading: false,
      };

    default:
      return state;
  }
}
