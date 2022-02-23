import React, { Component } from "react";

import TopWishItem from "./TopWishItem";

class TopWishFeed extends Component {
    render() {
        const topWishes = this.props.topWishes;
        return topWishes.map((topWish) => (
            <TopWishItem key={topWish._id} topWish={topWish} />
        ));
    }
}

export default TopWishFeed;
