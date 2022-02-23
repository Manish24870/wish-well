import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import {
  toggleLikePocketWish,
  togglePocketPocketWish,
} from "../../../actions/wishActions";
import classes from "./PocketItem.module.css";

class PocketItem extends Component {
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
    this.props.toggleLikePocketWish(id);
  };

  onPocketClick = (id) => {
    this.props.togglePocketPocketWish(id);
  };

  onCommentClick = (id) => {
    this.props.history.push(`/wishes/${id}`);
  };

  render() {
    const wish = this.props.wish;

    return (
      <div className={classes.wish_card}>
        <div className={classes.wish_card_header}>
          <div className={classes.header_image}>
            <img
              className={classes.header_image_img}
              src={
                process.env.REACT_APP_BASE_IMAGE_URL +
                "/images/" +
                wish.owner.avatar
              }
              alt="Pic"
            />
          </div>
          <div className={classes.header_info}>
            <p className={classes.header_info_name}>{wish.owner.username}</p>
            <p className={classes.header_info_date}>
              {moment.utc(wish.date).local().startOf("seconds").fromNow()}
            </p>
          </div>
        </div>
        <div className={classes.wish_card_content}>
          <div className={classes.card_content_heading}>{wish.heading}</div>
          <div className={classes.card_content_desc}>{wish.desc}</div>
        </div>
        <div className={classes.wish_card_footer}>
          <div className={classes.card_like}>
            <p
              className={classes.card_like_icon}
              onClick={() => this.onLikeClick(wish._id)}
            >
              {this.isLiked(wish.likes) ? (
                <i className="fas fa-heart wish_liked"></i>
              ) : (
                <i className="far fa-regular fa-heart wish_unliked"></i>
              )}
            </p>
            <div className={classes.card_like_count}>
              <p>{wish.likes.length} Wishes</p>
            </div>
          </div>
          <div className={classes.card_comment}>
            <p
              className={classes.card_comment_icon}
              onClick={() => this.onCommentClick(wish._id)}
            >
              <i className="far fa-regular fa-comment wish_unliked"></i>
            </p>
            <div className={classes.card_comment_count}>
              <p>{wish.comments.length} comments</p>
            </div>
          </div>
          <div className={classes.card_pocket}>
            <p
              className={classes.card_pocket_icon}
              onClick={() => this.onPocketClick(wish._id)}
            >
              {this.isPocketed(wish.pockets) ? (
                <i className="fas fa-regular fa-window-maximize wish_liked"></i>
              ) : (
                <i className="far fa-regular fa-window-maximize wish_unliked"></i>
              )}
            </p>
            <div className={classes.card_pocket_count}>
              <p>{wish.pockets.length} pockets</p>
            </div>
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

export default connect(mapStateToProps, {
  toggleLikePocketWish,
  togglePocketPocketWish,
})(withRouter(PocketItem));
