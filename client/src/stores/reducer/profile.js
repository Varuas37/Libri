import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  ERR_FOLLOW
} from "../action/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  followStats:null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case FOLLOW_USER:
      return {
        ...state,
        followStats: payload,
       
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followStats:payload
      };
    default:
      return state;
  }
}
