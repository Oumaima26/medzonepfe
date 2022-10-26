/* eslint-disable react/react-in-jsx-scope */
import React, { useRef, useState } from 'react';
import { withRouter } from "react-router-dom";
import './auth.css'
//import ConnectedHeader from './ConnectedHeader';
import PasswordForm from './PasswordForm';
import axios from 'axios';
function AuthForgot() {
    const nextPath = (path) => {
        window.location = path;
    }
    const emailref = useRef();
    const [otpFrom, showFrom] = useState(true)
    const sendOtp = async () => {
        const data = {
            email: emailref.current.value
        }
        console.log(data)
        axios.post('https://meddicombackend.herokuapp.com/users/email-send', data)
            .then((res) => {
                const record = res.data
                if (record.statusText === 'Success') {
                    console.log(record.message)
                    showFrom(false)
                }
                else {
                    console.log(record.message)
                }
            }).catch((err) => {
                console.log(err)
            });

    }
    return (
        <div style={{ backgroundColor: '#0d0631' }}>
            <div className="container" >
                <div className="card-items">
                    <div className="card-forgot">

                        {otpFrom ?
                            <>
                                <div className="block">
                                    <div className="input-t">
                                        <div className="top-login">
                                            <label className="text-forgot"><center>Forgot Password</center></label>
                                        </div>
                                        <div className="content">
                                            <input
                                                type="email"
                                                name='email'
                                                className="form__field"
                                                placeholder="Email"
                                                ref={emailref}
                                            />
                                        </div>
                                        <div className="footer-login ">
                                            <button className='btn-first' onClick={sendOtp}>Send</button>
                                        </div>
                                    </div>
                                    <div className="hrl"></div>
                                    <div className="align">
                                        <div className="create-account">
                                            <span className='log' onClick={() => nextPath('/')}>Log In</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <PasswordForm email={emailref.current.value} />
                        }
                    </div>

                </div>
            </div>
        </div>
    )

}
export default withRouter(AuthForgot);
