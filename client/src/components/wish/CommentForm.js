import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./CommentForm.module.css";
import { addComment } from "../../actions/wishActions";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const wishId = this.props.wishId;

        const comment = {
            desc: this.state.desc,
        };

        this.props.addComment(wishId, comment);
        this.setState({ desc: "" });
    };

    render() {
        const errors = this.state.errors;

        return (
            <div className={classes.newcomment_card}>
                <div className={classes.newcomment_heading}>
                    <p>Write a comment</p>
                </div>
                <form
                    onSubmit={this.onFormSubmit}
                    className={classes.newcomment_form_group}
                    autoComplete="off"
                >
                    <textarea
                        rows="3"
                        name="desc"
                        placeholder="Write your comment..."
                        className={classes.newcomment_input_field}
                        type="text"
                        onChange={this.onInputChange}
                        value={this.state.value}
                    ></textarea>
                    {errors.desc && (
                        <div className={classes.error_paragraph}>
                            {errors.desc}
                        </div>
                    )}
                    <button className={classes.newcomment_submit_btn}>
                        Comment
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

export default connect(mapStateToProps, { addComment })(CommentForm);
