import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Wishes from "./components/wishes/Wishes";
import Wish from "./components/wish/Wish";
import Profile from "./components/profile/Profile";
import TopWishes from "./components/wishes/topwishes/TopWishes";
import MyWishes from "./components/wishes/myWishes/MyWishes";
import Pocket from "./components/wishes/pocket/Pocket";
import { setCurrentUser } from "./actions/authActions";

// Check if the user is logged in
if (localStorage.jwt) {
    setAuthToken(localStorage.jwt);
    const decoded = jwt_decode(localStorage.jwt);
    store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/wishes"
                                component={Wishes}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/wishes/:id"
                                component={Wish}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/profile"
                                component={Profile}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/topwishes"
                                component={TopWishes}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/mywishes"
                                component={MyWishes}
                            />
                        </Switch>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/pocket"
                                component={Pocket}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
