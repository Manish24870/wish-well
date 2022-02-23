import React, { Component } from "react";
import { connect } from "react-redux";

import WishItem from "./WishItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/Spinner";
import classes from "./Wish.module.css";
import { getWish } from "../../actions/wishActions";

class Wish extends Component {
    componentDidMount() {
        this.props.getWish(this.props.match.params.id);
    }

    render() {
        const wish = this.props.wish.wish;
        const loading = this.props.wish.loading;

        let wishContent;
        if (wish === null || loading || Object.keys(wish).length === 0) {
            wishContent = <Spinner />;
        } else {
            wishContent = (
                <div className={classes.main_content}>
                    <WishItem wish={wish} />
                    <CommentForm wishId={wish._id} />
                    <div className={classes.comments_card}>
                        <h2 className={classes.comments_card_header}>
                            Comments
                        </h2>
                        <CommentFeed
                            wishId={wish._id}
                            comments={wish.comments}
                        />
                    </div>
                </div>
            );
        }

        return <div className={classes.container}>{wishContent}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        wish: state.wish,
    };
};

export default connect(mapStateToProps, { getWish })(Wish);
