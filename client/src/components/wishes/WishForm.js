import React, { Component } from "react";
import { connect } from "react-redux";

import { addWish } from "../../actions/wishActions";
import classes from "./WishForm.module.css";

class WishForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            desc: "",
            errors: {},
        };
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
        const wish = {
            desc: this.state.desc,
            heading: this.state.heading,
        };
        this.props.addWish(wish);
        this.setState({
            heading: "",
            desc: "",
        });
    };

    render() {
        const errors = this.state.errors;

        return (
            <div className={classes.newpost_card}>
                <div className={classes.newpost_header}>
                    <h2>Create Post</h2>
                </div>
                <div className={classes.newpost_info}>
                    <p>Share your ideas to the world</p>
                </div>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={this.onFormSubmit}
                    className={classes.newpost_form_group}
                >
                    <input
                        name="heading"
                        placeholder="Heading"
                        className={classes.newpost_input_field}
                        type="text"
                        onChange={this.onInputChange}
                        value={this.state.heading}
                    />
                    <textarea
                        rows="5"
                        name="desc"
                        placeholder="Write your wish..."
                        className={classes.newpost_input_field}
                        type="text"
                        onChange={this.onInputChange}
                        value={this.state.desc}
                    ></textarea>
                    {errors.desc && (
                        <div className={classes.error_paragraph}>
                            {errors.desc}
                        </div>
                    )}
                    <button className={classes.newpost_submit_btn}>
                        Create Wish
                    </button>
                </form>
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

export default connect(mapStateToProps, { addWish })(WishForm);
