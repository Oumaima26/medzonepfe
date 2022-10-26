import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Icon } from '@ohif/ui';
import axios from 'axios';
import './auth.css'
export default function PasswordForm(props) {
  const nextPath = (path) => {
    window.location = path;
  }
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  //error

  const [errpassword, setErrPassword] = useState('');
  const [errcpassword, setErrCPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault()

    if (validForm()) {
      const data = {
        password: password,
        email: props.email
      }
      console.log('data :', data);
      axios.post('https://meddicombackend.herokuapp.com/users/change-password', data)
        .then((res) => {
          console.log(res.data.message)
          setError(res.data.message)
          nextPath('/')
        }).catch((err) => {
          setError(err.data.message)
        });
    } else {
      console.log("Error")
    }
  }

  const validForm = () => {
    let formIsValid = true
    setErrPassword('');
    setErrCPassword('');
    setError('');
    if (password === "") {
      formIsValid = false
      setErrPassword("password is required!");
    }
    if (password.length < 6) {
      formIsValid = false
      setErrPassword("Password must be 6 char!");
    }
    if (cpassword === "") {
      formIsValid = false
      setErrCPassword("Confirm password is required!");
    }
    if (cpassword.length < 6) {
      formIsValid = false
      setErrCPassword("Confirm password must be 6 char!");
    }
    if (password !== cpassword) {
      formIsValid = false
      setError("Password and Confirm password are not matching!");
    }
    if (password === "") {
      formIsValid = false
      setError("password is required!");
    } else
      if (password.length < 6) {
        formIsValid = false
        setError("Password must be 6 char!");
      } else
        if (cpassword === "") {
          formIsValid = false
          setError("Confirm password is required!");
        } else
          if (cpassword.length < 6) {
            formIsValid = false
            setError("Confirm password must be 6 char!");
          } else
            if (password !== cpassword) {
              formIsValid = false
              setError("Password and Confirm password are not matching!");
            }
    return formIsValid;
  }
  return (
    <div className="block">
      <div className="input-t">
        <div className="top-login" >
          <label className="text">
            <center>Change Password</center>
          </label>
        </div>

        <div class="alert alert-danger" role="alert" >
          {error}
        </div>
        <div className="content">
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
          {
            errpassword.length > 0 && <span style={{ color: 'red' }}>{errpassword}</span>
          }
          <div className="form_input">
            <div className="two">
              <input
                type={!cpassShow ? "password" : "text"}
                onChange={(event) => {
                  setCPassword(event.target.value);
                }}
                name="cpassword"
                id="cpassword"
                placeholder='Confirm Password' />
              <div
                className="showpass"
                onClick={() => setCPassShow(!cpassShow)}>
                {!cpassShow ?
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
          {
            errcpassword.length > 0 && <span style={{ color: 'red' }}>{errcpassword}</span>
          }
        </div>
        <div className="footer-login ">
          <button className='btn-first' onClick={handleSubmit}>Change Password</button >
        </div>
      </div>
      <div className="hrl"></div>
      <div className="align">
        <div className="create-account">
          <span onClick={() => nextPath('/')}>Back</span>
        </div>
      </div>
    </div>
  )

}
