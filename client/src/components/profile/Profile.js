import React, { Component } from "react";
import { connect } from "react-redux";

import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import { getProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import classes from "./Profile.module.css";

class Profile extends Component {
    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        const profile = this.props.profile.profile;
        const loading = this.props.profile.loading;
        let profileContent;
        if (profile === null || loading) {
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div className={classes.main_content}>
                    <ProfileInfo profile={profile} />
                    <ProfileEdit />
                </div>
            );
        }

        return <div className={classes.container}>{profileContent}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, { getProfile })(Profile);
