import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser } from "../../actions/authActions";

import classes from "./Register.module.css";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
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
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        this.props.registerUser(user, this.props.history);
    };

    render() {
        const errors = this.state.errors;

        return (
            <div className={classes.main_content}>
                <div className={classes.register_main}>
                    <h3 className={classes.register_header}>Register</h3>
                    <p className={classes.register_info}>
                        Enter your credentials to create a new account.
                    </p>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={this.onFormSubmit}
                        className={classes.register_form_group}
                    >
                        <input
                            type="name"
                            className={classes.register_input_field}
                            placeholder="Username"
                            name="username"
                            onChange={this.onInputChange}
                            value={this.state.username}
                        />
                        {errors.username && (
                            <div className={classes.error_paragraph}>
                                {errors.username}
                            </div>
                        )}
                        <input
                            type="email"
                            className={classes.register_input_field}
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
                            className={classes.register_input_field}
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

                        <button
                            type="submit"
                            className={classes.register_submit_btn}
                        >
                            Register
                        </button>
                    </form>
                    <div className={classes.legal_content}>
                        <p className={classes.legal_content_text}>
                            By register in to your account, you agree to Wish
                            Well's Terms of Service and consent to our cookie
                            policy and privacy policy.
                        </p>
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
