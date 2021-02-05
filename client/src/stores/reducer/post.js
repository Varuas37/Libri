import {
  ADD_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_USERS_POSTS,
  UPDATE_LIKES_ERROR,
} from "../action/types";
const initialState = {
  posts: [],
  post: null,
  userPosts: [],
  user_Posts_Loading: true,
  post_loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        post_loading: false,
      };
    case GET_USERS_POSTS:
      return {
        ...state,
        userPosts: payload,
        user_Posts_Loading: false,
        post_loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        post_loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        post_loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        post_loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post_loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        post_loading: false,
      };
    case UPDATE_LIKES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        post_loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id === payload
          ),
        },
        post_loading: false,
      };
    default:
      return state;
  }
}
