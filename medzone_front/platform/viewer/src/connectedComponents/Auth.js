/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import avatar from './avatar.png'

import axios from 'axios';
import { Icon } from '@ohif/ui';
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
                console.log(res.data)
                if (res.data.status) {
                    localStorage.setItem('email', this.state.email);
                    window.location.reload(false);
                }
                if (!res.data.status) {
                    alert(res.data.message)
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

                                <Link to="/authadmin">
                                    <button className="btn btn-info" type="submit"
                                        style={{ "float": "right", "position": "relative", marginTop: '1px', marginLeft: '250px', backgroundColor: '#33a795' }}>

                                        <Icon name='user' style={{ "fontSize": "20px" }} />
                                        Admin</button>
                                </Link>
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
                                    <div className="create-account">

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

/*
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
                                    <div className="create-account">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            */
