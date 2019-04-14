import React, { Component } from 'react'

import TopMenuComponent from "../../components/navigation/topMenuComponent";


class TopMenuContainer extends Component {
    render() {
        console.log(this.props);
        return (
            <TopMenuComponent />
        );
    }
}

export default TopMenuContainer;
