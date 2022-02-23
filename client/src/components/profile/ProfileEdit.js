import React, { Component } from "react";
import { connect } from "react-redux";

import {
    editProfileUsername,
    editProfilePassword,
    uploadAvatar,
} from "../../actions/profileActions";
import classes from "./ProfileEdit.module.css";

class ProfileEdit extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            avatar: {},
        };
    }

    onDeleteUserSubmit = (e) => {
        e.preventDefault();
        this.props.deleteUser();
    };

    submitUsernameChange = (e) => {
        e.preventDefault();
        const newData = {
            username: this.state.username,
        };
        this.props.editProfileUsername(newData);
    };

    submitPasswordChange = (e) => {
        e.preventDefault();
        const newData = {
            password: this.state.password,
        };
        this.props.editProfilePassword(newData);
    };

    submitprofileImageChange = (e) => {
        e.preventDefault();
        this.props.uploadAvatar(this.state.avatar);
    };

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onImageInputChange = (e) => {
        const files = e.target.files;
        this.setState({ avatar: files[0] });
    };

    render() {
        return (
            <React.Fragment>
                <div className={classes.profile_edit}>
                    <h2 className={classes.profile_edit_heading}>
                        Edit your profile
                    </h2>
                    <div className={classes.profile_edit_username}>
                        <p className={classes.edit_username_title}>
                            Enter new username.
                        </p>
                        <form
                            autoComplete="off"
                            onSubmit={this.submitUsernameChange}
                            className={classes.edit_username_form}
                        >
                            <input
                                placeholder="New Username"
                                name="username"
                                type="text"
                                className={classes.edit_username_input}
                                value={this.state.username}
                                onChange={this.onInputChange}
                            />
                            <button className={classes.edit_username_btn}>
                                Change Username
                            </button>
                        </form>
                    </div>
                    <div className={classes.profile_edit_password}>
                        <p className={classes.edit_password_title}>
                            Enter new password.
                        </p>
                        <form
                            autoComplete="off"
                            onSubmit={this.submitPasswordChange}
                            className={classes.edit_password_form}
                        >
                            <input
                                placeholder="New Password"
                                name="password"
                                type="password"
                                className={classes.edit_password_input}
                                value={this.state.password}
                                onChange={this.onInputChange}
                            />
                            <button className={classes.edit_password_btn}>
                                Change Password
                            </button>
                        </form>
                    </div>
                    <div className={classes.profile_edit_image}>
                        <p className={classes.edit_image_title}>
                            Upload new image.
                        </p>
                        <form
                            onSubmit={this.submitprofileImageChange}
                            className={classes.edit_image_form}
                            encType="multipart/form-data"
                        >
                            <input
                                placeholder="New Image"
                                name="avatar"
                                type="file"
                                className={classes.edit_image_input}
                                onChange={this.onImageInputChange}
                            />
                            <button className={classes.edit_image_btn}>
                                Change Image
                            </button>
                        </form>
                    </div>
                </div>
                {/* <div className={classes.account_delete}>
                    <h2 className={classes.account_delete_heading}>
                        Delete your account
                    </h2>
                    <div className={classes.account_delete_zone}>
                        <p className={classes.account_delete_title}>
                            Once you delete your account, there is no going
                            back. Please be certain.
                        </p>
                        <form
                            onSubmit={this.onDeleteUserSubmit}
                            className={classes.account_delete_form}
                        >
                            <button className={classes.account_delete_btn}>
                                Delete your account
                            </button>
                        </form>
                    </div>
                </div> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, {
    editProfileUsername,
    editProfilePassword,
    uploadAvatar,
})(ProfileEdit);
