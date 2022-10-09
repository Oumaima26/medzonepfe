/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';
import './auth.css'
import { AuthContext } from '../context/authContext';
class Auth extends Component {
    static contextType = AuthContext;
    nextPath(path) {
        this.props.history.push(path);
    }
    state = {
        email: '',
        password: '',
    };
    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state;
        console.log('data :', data);
        axios.post('http://localhost:5000/users/login', data)
            .then((res) => {
                if (res.data.status) {
                    localStorage.setItem('role', res.data.role);
                    if (res.data.role === 'admin') {
                        localStorage.setItem('emailadmin', this.state.email);
                        localStorage.setItem('admin', res.data.nom + " " + res.data.prenom);
                        localStorage.setItem('idadmin', res.data.id);
                        this.nextPath('/radiologue');
                    }
                    if (res.data.role === 'radiologue') {
                        window.location.reload(false);
                        localStorage.setItem('email', this.state.email);
                        this.nextPath('/');
                    }
                }
            });

    }
    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <div style={{ backgroundColor: '#0d0631' }}>
                <div className="container" >
                    <div className="card-items">
                        <div className="card-login th">
                            <div className="block">
                                <div className="input-t">
                                    <div className="top-login" >
                                        <label className="text">
                                            <center>Log In</center>
                                        </label>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="content">
                                        <input type="text" className="form__field" placeholder="Email" name="email" onChange={this.handleChange}></input>
                                        <input type="password" className="form__field" placeholder="Password" name="password" onChange={this.handleChange}></input>
                                    </div>
                                    <div className="footer-login ">
                                        <button className='btn-first' onClick={this.handleSubmit}>Log In</button >
                                    </div>
                                </div>
                                <div className="hrl"></div>
                                <div className="align">
                                    <div className="create-account">
                                        <span onClick={() => this.nextPath('/auth/signup')}>Create an account</span>
                                        <span onClick={() => this.nextPath('/auth/forgot')}>Forgot password?</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Auth);
