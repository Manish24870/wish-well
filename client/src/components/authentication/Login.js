import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authActions";
import classes from "./Login.module.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuth) {
            this.props.history.push("/wishes");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.auth.isAuth) {
            this.props.history.push("/wishes");
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(user);
    };
    render() {
        const errors = this.state.errors;

        return (
            <div className={classes.container}>
                <div className={classes.main_content}>
                    <div className={classes.signin_main}>
                        <h3 className={classes.signin_header}>Sign In</h3>
                        <p className={classes.signin_info}>
                            Enter your credentials to login to your account.
                        </p>
                        <form
                            noValidate
                            autoComplete="off"
                            className={classes.signin_form_group}
                            onSubmit={this.onFormSubmit}
                        >
                            <input
                                type="email"
                                className={classes.signin_input_field}
                                placeholder="Email address"
                                name="email"
                                onChange={this.onInputChange}
                                value={this.state.email}
                            />
                            {errors.email && (
                                <div className={classes.error_paragraph}>
                                    {errors.email}
                                </div>
                            )}
                            <input
                                type="password"
                                className={classes.signin_input_field}
                                placeholder="Password"
                                name="password"
                                onChange={this.onInputChange}
                                value={this.state.password}
                            />
                            {errors.password && (
                                <div className={classes.error_paragraph}>
                                    {errors.password}
                                </div>
                            )}

                            {/* <label className={classes.form_checkbox}>
                                <input
                                    className={classes.form_checkbox_input}
                                    type="checkbox"
                                    checked="checked"
                                />
                                <span
                                    className={classes.form_checkbox_checkmark}
                                ></span>
                                <span className={classes.form_checkbox_span}>
                                    Keep me signed in
                                </span>
                            </label> */}

                            <button
                                type="submit"
                                className={classes.signin_submit_btn}
                            >
                                Login
                            </button>
                        </form>
                        <div className={classes.legal_content}>
                            <p className={classes.legal_content_text}>
                                By signing in to your account, you agree to Wish
                                Well's Terms of Service and consent to our
                                cookie policy and privacy policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, { loginUser })(Login);
