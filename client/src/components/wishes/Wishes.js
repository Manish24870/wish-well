import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Wishes.module.css";
import WishFeed from "./WishFeed";
import WishForm from "./WishForm";
import Spinner from "../common/Spinner";
import { getWishes } from "../../actions/wishActions";

class Wishes extends Component {
    componentDidMount() {
        this.props.getWishes();
    }

    render() {
        const wishes = this.props.wish.wishes;
        const loading = this.props.wish.loading;
        let wishContent;

        if (wishes === null || loading) {
            wishContent = <Spinner />;
        } else {
            wishContent = <WishFeed wishes={wishes} />;
        }

        return (
            <div className={classes.container}>
                <div className={classes.main_content}>
                    <div className={classes.main_content_left}>
                        {wishContent}
                    </div>
                    <div className={classes.main_content_right}>
                        <WishForm />
                    </div>
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

export default connect(mapStateToProps, { getWishes })(Wishes);
