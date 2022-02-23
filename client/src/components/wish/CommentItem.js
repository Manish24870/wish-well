import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { deleteComment } from "../../actions/wishActions";
import classes from "./CommentItem.module.css";

class CommentItem extends Component {
  onCommentDelete = (wishId, commentId) => {
    this.props.deleteComment(wishId, commentId);
  };

  render() {
    const comment = this.props.comment;
    const wishId = this.props.wishId;
    const auth = this.props.auth;

    return (
      <div className={classes.acomment_card}>
        <div className={classes.acomment_card_header}>
          <div className={classes.acomment_header_image}>
            <img
              className={classes.acomment_header_image_img}
              src={
                process.env.REACT_APP_BASE_IMAGE_URL +
                "/images/" +
                comment.user.avatar
              }
              alt="Pic"
            />
          </div>
          <div className={classes.acomment_header_info}>
            <p className={classes.acomment_header_info_name}>
              {comment.user.username}
            </p>
            <p className={classes.acomment_header_info_date}>
              {moment.utc(comment.date).local().startOf("seconds").fromNow()}
            </p>
          </div>
          {comment.user._id === auth.user._id ? (
            <div
              onClick={() => this.onCommentDelete(wishId, comment._id)}
              className={classes.acomment_header_delete}
            >
              <p>
                <i className="fas fa-times"></i>
              </p>
            </div>
          ) : null}
        </div>
        <div className={classes.acomment_card_content}>
          <div className={classes.acomment_card_content_desc}>
            {comment.desc}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { deleteComment })(CommentItem);
