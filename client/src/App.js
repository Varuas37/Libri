import React, { Fragment, useEffect } from "react";
// REDUX
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./stores/action/auth";
import setAuthToken from "./utils/setAuthToken";
import history from "./utils/history";
//CSS IMPORT
import "./App.css";
import "./components/pages/auth/auth.css";
import "./components/layout/Post/Post.css";
import "./components/layout/Post/CreatePost.css";
import "./components/layout/Modal/PopoverAlert.css";
import "./components/layout/Modal/Modal.css";
import "./components/layout/GridWrapper/GridWrapper.css";
import "./components/layout/Profile/Profile.css";
import "./components/pages/Store/Sell.css";
import "./components/layout/Searchbox/Searchbar.css";

// IMPORTING COMPONENTS
import Landing from "./components/pages/Landing/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/UserHome/Home";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profile from "./components/pages/Profile/Profile";
import Marketplace from "./components/pages/Store/Marketplace";
import CreateListing from "./components/pages/Store/CreateListing";
import ListBooks from "./components/pages/Store/Sell/Create-Listing/ListBooks";
import ListingForm from "./components/layout/CreateListing/ListingForm";
import ListOther from "./components/pages/Store/Sell/Create-Listing/ListOther";
import ListEvents from "./components/pages/Store/Sell/Create-Listing/ListEvents";
import EventForm from "./components/layout/CreateListing/EventForm";
import BookMarket from "./components/pages/Store/BookMarket";
import ProductMarket from "./components/pages/Store/ProductMarket";
import EventMarket from "./components/pages/Store/EventMarket";
import DetailedProduct from "./components/layout/ProductDetail/DetailedProduct";
import ProductDetails from "./components/pages/Product/DetailListing/ProductDetails";
import Courses from "./components/pages/Courses/Courses";
import OtherProfile from "./components/pages/Profile/OtherProfile";
import CommingSoon from "./components/pages/UnderDevelopment/CommingSoon";
import ResetPassword from "./components/pages/auth/ResetPassword";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    // setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Alert></Alert>
          {/* <PopoverAlert></PopoverAlert> */}
          <Route exact path="/" component={Landing} />
          <Switch>
            <PrivateRoute exact path="/Home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/listingForm" component={ListingForm} />

            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/store" component={Marketplace} />
            <PrivateRoute
              exact
              path="/store/create"
              component={CreateListing}
            />
            <PrivateRoute
              exact
              path="/store/create/books"
              component={ListBooks}
            />
            <Route exact path="/store/create/others" component={ListOther} />
            <Route exact path="/listingForm" component={ListingForm} />
            <Route exact path="/store/create/events" component={ListEvents} />
            <PrivateRoute exact path="/eventsForm" component={EventForm} />
            <PrivateRoute exact path="/books" component={BookMarket} />
            <PrivateRoute
              exact
              path="/college-essentials"
              component={ProductMarket}
            />
            <PrivateRoute exact path="/events" component={EventMarket} />
            <PrivateRoute exact path="/books/:id" component={ProductDetails} />
            <PrivateRoute
              exact
              path="/college-essentials/:id"
              component={ProductDetails}
            />
            <PrivateRoute exact path="/events/:id" component={ProductDetails} />
            <PrivateRoute exact path="/profile/:id" component={OtherProfile} />
            <PrivateRoute exact path="/message" component={CommingSoon} />
            <PrivateRoute exact path="/groups" component={CommingSoon} />

            <Route exact path="/courses" component={CommingSoon} />
            <Route exact path="/store/you/selling" component={CommingSoon} />
            <Route exact path="/reset-password" component={ResetPassword} />


          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
