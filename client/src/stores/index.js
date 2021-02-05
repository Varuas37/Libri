import { combineReducers } from "redux";
import alert from "./reducer/alert";
import auth from "./reducer/auth";
import profile from "./reducer/profile";
import product from "./reducer/product";
import event from "./reducer/event";
import post from "./reducer/post";
import university from "./reducer/university";
export default combineReducers({ alert, auth, product, profile, event, post,university });
