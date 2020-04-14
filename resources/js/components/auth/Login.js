import React , { Component } from 'react'
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import axios from "axios"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: null
        };
    }
    componentDidMount() {
        if (
            localStorage.getItem("user") !== "undefined" &&
            localStorage.getItem("user") !== null
        ) {
            window.location.replace("/dashboard");
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    Submit(event) {
        event.preventDefault();
        axios({
            method: "post",
            url: "/api/login",
            data: this.state
        })
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                window.location.replace("/dashboard");
            })
            .catch(error => {
                this.setState({ errors: error.response.data.error });
            });
        console.log(this.state);
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col md={6}>
                        <Form onSubmit={this.Submit.bind(this)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange.bind(this)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange.bind(this)}
                                    required
                                />
                                <Form.Text className="text-danger">
                                    {this.state.errors}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

export default Login;