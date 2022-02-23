import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import { deleteMyWish } from "../../../actions/wishActions";
import classes from "./MyWishItem.module.css";

class MyWishItem extends Component {
  onDeleteWishClick = (id) => {
    this.props.deleteMyWish(id);
  };

  onMyWishClick = (id) => {
    this.props.history.push(`/wishes/${id}`);
  };

  render() {
    const myWish = this.props.myWish;

    return (
      <div className={classes.mywish_card}>
        <div className={classes.mywish_card_header}>
          <div className={classes.header_image}>
            <img
              className={classes.header_image_img}
              src={
                process.env.REACT_APP_BASE_IMAGE_URL +
                "/images/" +
                myWish.owner.avatar
              }
              alt="Pic"
            />
          </div>
          <div className={classes.header_info}>
            <p className={classes.header_info_name}>{myWish.owner.username}</p>
            <p className={classes.header_info_date}>
              {moment.utc(myWish.date).local().startOf("seconds").fromNow()}
            </p>
          </div>
        </div>
        <div
          onClick={() => this.onMyWishClick(myWish._id)}
          className={classes.mywish_card_content}
        >
          <div className={classes.card_content_heading}>{myWish.heading}</div>
          <div className={classes.card_content_desc}>{myWish.desc}</div>
        </div>
        <div className={classes.mywish_card_footer}>
          <button
            onClick={() => this.onDeleteWishClick(myWish._id)}
            className={classes.footer_remove_btn}
          >
            Remove Wish
          </button>
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
  deleteMyWish,
})(withRouter(MyWishItem));
