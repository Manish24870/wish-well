import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import {
  toggleLikeTopWish,
  togglePocketTopWish,
} from "../../../actions/wishActions";
import classes from "./TopWishItem.module.css";

class TopWishItem extends Component {
  // Check if the user has liked a wish or not
  isLiked = (likes) => {
    const auth = this.props.auth;
    if (likes.filter((like) => like.user === auth.user._id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Check if the user has pocketed a wish or not
  isPocketed = (pockets) => {
    const auth = this.props.auth;
    if (pockets.filter((pocket) => pocket.user === auth.user._id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  onLikeClick = (id) => {
    this.props.toggleLikeTopWish(id);
  };

  onPocketClick = (id) => {
    this.props.togglePocketTopWish(id);
  };

  onCommentClick = (id) => {
    this.props.history.push(`/wishes/${id}`);
  };

  render() {
    const topWish = this.props.topWish;

    return (
      <div className={classes.topwish_card}>
        <div className={classes.topwish_card_footer}>
          <div className={classes.card_like}>
            <p
              className={classes.card_like_icon}
              onClick={() => this.onLikeClick(topWish._id)}
            >
              {this.isLiked(topWish.likes) ? (
                <i className="fas fa-heart wish_liked"></i>
              ) : (
                <i className="far fa-regular fa-heart wish_unliked"></i>
              )}
            </p>
            <div className={classes.card_like_count}>
              <p>{topWish.likes.length} Wishes</p>
            </div>
          </div>
          <div className={classes.card_comment}>
            <p
              className={classes.card_comment_icon}
              onClick={() => this.onCommentClick(topWish._id)}
            >
              <i className="far fa-regular fa-comment wish_unliked"></i>
            </p>
            <div className={classes.card_comment_count}>
              <p>{topWish.comments.length} comments</p>
            </div>
          </div>
          <div className={classes.card_pocket}>
            <p
              className={classes.card_pocket_icon}
              onClick={() => this.onPocketClick(topWish._id)}
            >
              {this.isPocketed(topWish.pockets) ? (
                <i className="fas fa-regular fa-window-maximize wish_liked"></i>
              ) : (
                <i className="far fa-regular fa-window-maximize wish_unliked"></i>
              )}
            </p>
            <div className={classes.card_pocket_count}>
              <p>{topWish.pockets.length} pockets</p>
            </div>
          </div>
        </div>
        <div className={classes.topwish_card_header}>
          <div className={classes.header_image}>
            <img
              className={classes.header_image_img}
              src={
                process.env.REACT_APP_BASE_IMAGE_URL +
                "/images/" +
                topWish.owner.avatar
              }
              alt="Pic"
            />
          </div>
          <div className={classes.header_info}>
            <p className={classes.header_info_name}>{topWish.owner.username}</p>
            <p className={classes.header_info_date}>
              {moment.utc(topWish.date).local().startOf("seconds").fromNow()}
            </p>
          </div>
        </div>
        <div className={classes.topwish_card_content}>
          <div className={classes.card_content_heading}>{topWish.heading}</div>
          <div className={classes.card_content_desc}>{topWish.desc}</div>
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

export default connect(mapStateToProps, {
  toggleLikeTopWish,
  togglePocketTopWish,
})(withRouter(TopWishItem));
