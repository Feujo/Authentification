import React , { Component} from 'react'
import SiteNavbar from "./SiteNavbar";
import { Container } from 'react-bootstrap';

class SiteLayout extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <SiteNavbar />
                <div className="main-content">{this.props.children}</div>
            </div>
        );
    }
};

export default SiteLayout;