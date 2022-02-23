import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Pocket.module.css";
import PocketFeed from "./PocketFeed";
import Spinner from "../../common/Spinner";
import { getMyPocket } from "../../../actions/wishActions";

class Pocket extends Component {
    componentDidMount() {
        this.props.getMyPocket();
    }

    render() {
        const wishes = this.props.wish.myPocket;
        const loading = this.props.wish.loadingPocket;
        let pocketContent;

        if (wishes === null || loading) {
            pocketContent = <Spinner />;
        } else {
            pocketContent = <PocketFeed wishes={wishes} />;
        }

        return (
            <div className={classes.container}>
                <div className={classes.main_content}>
                    <h2 className={classes.main_content_header}>My Pocket</h2>
                    {pocketContent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wish: state.wish,
    };
};

export default connect(mapStateToProps, { getMyPocket })(Pocket);
