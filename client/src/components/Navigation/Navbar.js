import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import classes from "./Navbar.module.css";

class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.clearCurrentProfile();
    };

    render() {
        const isAuth = this.props.auth.isAuth;
        const authLinks = (
            <div className={classes.nav_bar}>
                <h2 className={classes.nav_logo}>
                    Wish<span>.</span>Well
                </h2>
                <div className={classes.nav_group}>
                    <ul className={classes.nav_group_1}>
                        <li className={classes.nav_item_1}>
                            <Link to="/wishes">Home</Link>
                        </li>
                        <li className={classes.nav_item_1}>
                            <Link to="/topwishes">Top</Link>
                        </li>
                        <li className={classes.nav_item_1}>
                            <Link to="/mywishes">My Wishes</Link>
                        </li>
                        <li className={classes.nav_item_1}>
                            <Link to="/pocket">Pocket</Link>
                        </li>
                        <li className={classes.nav_item_1}>
                            <Link to="/profile">My Profile</Link>
                        </li>
                    </ul>
                    <ul className={classes.nav_group_2}>
                        <li className={classes.nav_item_2}>
                            <Link onClick={this.onLogoutClick} to="/logout">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );

        const guestLinks = (
            <div className={classes.nav_bar}>
                <h2 className={classes.nav_logo}>
                    Wish<span>.</span>Well
                </h2>
                <div className={classes.nav_group}>
                    <ul className={classes.nav_group_1}></ul>
                    <ul className={classes.nav_group_2}>
                        <li className={classes.nav_item_2}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={classes.nav_item_2}>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
        return (
            <div className={classes.container}>
                {isAuth ? authLinks : guestLinks}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
    Navbar
);
