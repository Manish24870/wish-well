import React, { Component } from "react";

import WishItem from "./WishItem";

class WishFeed extends Component {
    render() {
        const wishes = this.props.wishes;
        return wishes.map((wish) => <WishItem key={wish._id} wish={wish} />);
    }
}

export default WishFeed;
