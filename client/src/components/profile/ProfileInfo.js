import React, { Component } from "react";

import classes from "./ProfileInfo.module.css";

class ProfileInfo extends Component {
  render() {
    const user = this.props.profile.user;
    const count = this.props.profile.count;
    return (
      <div className={classes.profile_info}>
        <div className={classes.image_container}>
          <img
            src={
              process.env.REACT_APP_BASE_IMAGE_URL + "/images/" + user.avatar
            }
            alt="Pic"
            className={classes.profile_image}
          />
        </div>
        <div className={classes.username_container}>
          <p>{user.username}</p>
        </div>
        <div className={classes.stats_container}>
          <div className={classes.stats_container_post}>
            <span className={classes.span1}>{count.wishesCount}</span>
            <span className={classes.span2}>Posts</span>
          </div>
          <div className={classes.stats_container_comment}>
            <span className={classes.span1}>{count.commentsCount}</span>
            <span className={classes.span2}>Comments</span>
          </div>
          <div className={classes.stats_container_wish}>
            <span className={classes.span1}>{count.likesCount}</span>
            <span className={classes.span2}>Likes</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
