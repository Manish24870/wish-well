import React, { Component } from "react";

import CommentItem from "./CommentItem";

class CommentFeed extends Component {
    render() {
        const comments = this.props.comments;
        const wishId = this.props.wishId;

        return comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} wishId={wishId} />
        ));
    }
}

export default CommentFeed;
