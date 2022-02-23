import React, { Component } from "react";

import MyWishItem from "./MyWishItem";

class MyWishFeed extends Component {
    render() {
        const myWishes = this.props.myWishes;
        return myWishes.map((myWish) => (
            <MyWishItem key={myWish._id} myWish={myWish} />
        ));
    }
}

export default MyWishFeed;
