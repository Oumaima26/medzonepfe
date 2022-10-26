import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Icon } from '@ohif/ui';
import axios from 'axios';
import './auth.css'
function Auth() {
    const nextPath = (path) => {
        window.location = path;
    }
    const [passShow, setPassShow] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            email: email,
            password: password,
        }
        console.log('data :', data);
        axios.post('https://meddicombackend.herokuapp.com/users/login', data)
            .then((res) => {
                if (res.data.status) {
                    localStorage.setItem('role', res.data.role);
                    if (res.data.role === 'admin') {
                        localStorage.setItem('emailadmin', email);
                        localStorage.setItem('admin', res.data.nom + " " + res.data.prenom);
                        localStorage.setItem('idadmin', res.data.id);
                        nextPath('/radiologue');
                    }
                    if (res.data.role === 'radiologue') {
                        window.location.reload(false);
                        localStorage.setItem('email', email);
                        nextPath('/');
                    }
                }
            }).catch((err) => {
                console.log(err)
            });

    }
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
                                    <input type="email"
                                        className="form__field"
                                        placeholder="Email"
                                        name="email"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }} />
                                    <div className="form_input">
                                        <div className="two">
                                            <input
                                                type={!passShow ? "password" : "text"}
                                                onChange={(event) => {
                                                    setPassword(event.target.value);
                                                }}
                                                name="password"
                                                id="password"
                                                placeholder='Password' />
                                            <div
                                                className="showpass"
                                                onClick={() => setPassShow(!passShow)}>
                                                {!passShow ?
                                                    <a>
                                                        <Icon name='eye' style={{ width: "32px" }} />
                                                    </a>
                                                    :
                                                    <a>
                                                        <Icon name='eye-closed' style={{ width: "35px" }} />
                                                    </a>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="footer-login ">
                                    <button className='btn-first' onClick={handleSubmit}>Log In</button >
                                </div>
                            </div>
                            <div className="hrl"></div>
                            <div className="align">
                                <div className="create-account">
                                    <span onClick={() => nextPath('/auth/signup')}>Create an account</span>
                                    <span onClick={() => nextPath('/auth/forgot')}>Forgot password?</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default withRouter(Auth);

/*
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './auth.css'
import { AuthContext } from '../context/authContext';

class Auth extends Component {
    static contextType = AuthContext;
    nextPath(path) {
        this.props.history.push(path);
    }
    state = {
        passShow: false,
        email: '',
        password: '',
    };
    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state;
        axios.post('https://meddicombackend.herokuapp.com/users/login', data)
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
            }).catch((err) => {
                console.log(err)
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
                                        <input
                                            type={!passShow ? "password" : "text"}
                                            onChange={this.handleChange}
                                            value={password} name="password"
                                            id="password"
                                            placeholder='Enter Your password' />
                                        <div className="showpass" onClick={() => this.setState({ password: !passShow })}>
                                            {!passShow ? "Show" : "Hide"}
                                        </div>
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
*/
