import React, { Component } from "react";
import { connect } from "react-redux";

import TopWishFeed from "./TopWishFeed";
import Spinner from "../../common/Spinner";
import { getTopWishes } from "../../../actions/wishActions";
import classes from "./TopWishes.module.css";

class TopWishes extends Component {
    componentDidMount() {
        this.props.getTopWishes();
    }

    render() {
        const topWishes = this.props.wish.topWishes;
        const loading = this.props.wish.loadingTop;
        let topWishContent;

        if (topWishes === null || loading) {
            topWishContent = <Spinner />;
        } else {
            topWishContent = <TopWishFeed topWishes={topWishes} />;
        }

        return (
            <div className={classes.container}>
                <div className={classes.main_content}>
                    <h2 className={classes.main_content_header}>Top Wishes</h2>
                    {topWishContent}
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

export default connect(mapStateToProps, { getTopWishes })(TopWishes);
