import React, { Component} from 'react'

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (
            localStorage.getItem("user") === "undefined" ||
            localStorage.getItem("user") === null
        ) {
            window.location.replace("/");
        }
    }
    render() {
        return <div>La page de Dashboard</div>;
    }
}

export default Dashboard;