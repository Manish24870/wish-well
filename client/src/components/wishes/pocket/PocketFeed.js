import React, { Component } from "react";

import PocketItem from "./PocketItem";

class PocketFeed extends Component {
    render() {
        const wishes = this.props.wishes;
        return wishes.map((wish) => <PocketItem key={wish._id} wish={wish} />);
    }
}

export default PocketFeed;
