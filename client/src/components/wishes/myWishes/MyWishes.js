import React, { Component } from "react";
import { connect } from "react-redux";

import MyWishFeed from "./MyWishFeed";
import Spinner from "../../common/Spinner";
import { getMyWishes } from "../../../actions/wishActions";
import classes from "./MyWishes.module.css";

class MyWishes extends Component {
    componentDidMount() {
        this.props.getMyWishes();
    }

    render() {
        const myWishes = this.props.wish.myWishes;
        const loading = this.props.wish.loadingMy;
        let myWishContent;

        if (myWishes === null || loading) {
            myWishContent = <Spinner />;
        } else {
            myWishContent = <MyWishFeed myWishes={myWishes} />;
        }

        return (
            <div className={classes.container}>
                <div className={classes.main_content}>
                    <h2 className={classes.main_content_header}>My Wishes</h2>
                    {myWishContent}
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

export default connect(mapStateToProps, { getMyWishes })(MyWishes);
