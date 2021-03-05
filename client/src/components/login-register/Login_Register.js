import React, { Component } from 'react'
import './Login-register.css'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
// import Dashboard from '../dashboard/Dashboard';
// import "../Home/Home.css"


class Login_Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
        };
        this.changeHandlerUsername = this.changeHandlerUsername.bind(this)
        this.changeHandlerPassword = this.changeHandlerPassword.bind(this)
    };

    isAuthenticated() {
        Axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                "x-token": localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response)
        })
    }

    directToLogin = () => {
        Axios.post("http://localhost:3001/login", {
            username: this.state.username,
            password: this.state.password,
        }).then((response) => {
            if (!response.data.auth) {
                alert(response.data.msg)
            }
            else {
                localStorage.setItem("token", response.data.token)
                this.isAuthenticated();
                this.setState({

                    isLoggedIn: true,
                })
            }
        });
    }

    changeHandlerUsername(e) {
        this.setState({
            username: e.target.value
        })
    };

    changeHandlerPassword(e) {
        this.setState({
            password: e.target.value
        })
    };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect to='/Dashboard/Home' />
            )
        }
        else {
            return (
                < div className="login-page">
                    < div className="wrapper" >
                        <div className="title-text">
                            <div className="title login">
                                Login Page
                        </div>
                        </div>
                        <div className="form-container">

                            <div className="form-inner">
                                <div className="login">
                                    <div className="field1">
                                        <input type="text" placeholder="Username" required onChange={this.changeHandlerUsername} />
                                    </div>
                                    <div className="field2">
                                        <input type="password" placeholder="Password" required onChange={this.changeHandlerPassword} />
                                    </div>

                                    <div className="field-btn">
                                        <div className="btn-layer">
                                        </div>
                                        <input type="submit" value="Login" onClick={this.directToLogin} />
                                    </div>
                                </div>
                                <form action="#" className="register">
                                    <div className="field" />
                                    <div className="field" />
                                    <div className="field" />
                                    <div className="field" />
                                    <div className="field">

                                    </div>
                                    <div className="field">

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            )
        }
    }
}

export default Login_Register;