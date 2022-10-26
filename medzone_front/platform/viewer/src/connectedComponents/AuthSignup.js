import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Icon } from '@ohif/ui';
import axios from 'axios';
import './auth.css'
function AuthSignup() {
  const nextPath = (path) => {
    window.location = path;
  }

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  //error
  const [errnom, setErrNom] = useState('');
  const [errprenom, setErrPrenom] = useState('');
  const [erremail, setErrEmail] = useState('');
  const [errrole, setErrRole] = useState('');
  const [errpassword, setErrPassword] = useState('');
  const [errcpassword, setErrCPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForm()) {
      const data = {
        nom: nom,
        prenom: prenom,
        email: email,
        role: role,
        password: password
      }
      console.log('data :', data);
      axios.post('https://meddicombackend.herokuapp.com/users/register', data)
        .then((res) => {
          console.log(res.data)
          if (res.data == 'added') {
            nextPath('/')
          }
        });
    } else {
      console.log("Error")
    }

  }
  const validForm = () => {
    let formIsValid = true
    setErrNom('');
    setErrPrenom('');
    setErrEmail('');
    setErrRole('');
    setErrPassword('');
    setErrCPassword('');
    if (nom === "") {
      formIsValid = false
      setErrNom('Last name is required!')
    }
    if (prenom === "") {
      setErrPrenom('First name is required!')
    }
    if (role === "") {
      setErrRole('Role is required!')
    }
    if (email === "") {
      setErrEmail("Email is required!");
    }
    if (!email.includes("@")) {
      setErrEmail("Includes @ in your email!");
    }
    if (password === "") {
      setErrPassword("password is required!");
    }
    if (password.length < 6) {
      setErrPassword("Password must be 6 char!");
    }
    if (cpassword === "") {
      setErrCPassword("Confirm password is required!");
    }
    if (cpassword.length < 6) {
      setErrCPassword("Confirm password must be 6 char!");
    }
    if (password !== cpassword) {
      setErrCPassword("Password and Confirm password are not matching!");
      setErrPassword("Password and Confirm password are not matching!");
    }
    return formIsValid;
  }
  return (
    <div style={{ backgroundColor: '#0d0631', fontSize: '100%' }}>
      <div className="container">
        <div className="card-items" >
          <div className="card-signup" >
            <div className="block" >
              <div className="input-t" >
                <div className="top-login">
                  <label className="text"><center>Sign Up</center></label>
                </div>
                <div className="content" style={{ paddingTop: '0.3rem' }}>
                  <input
                    type="text"
                    className="form__field"
                    placeholder="First Name"
                    name="nom"
                    onChange={(event) => {
                      setNom(event.target.value);
                    }}
                  />
                  {
                    errnom.length > 0 && <span style={{ color: 'red' }}>{errnom}</span>
                  }
                  <input
                    type="text"
                    className="form__field"
                    placeholder="Last Name"
                    name="prenom"
                    onChange={(event) => {
                      setPrenom(event.target.value);
                    }}
                  />
                  {
                    errprenom.length > 0 && <span style={{ color: 'red' }}>{errprenom}</span>
                  }
                  <input
                    type="email"
                    className="form__field"
                    placeholder="Email"
                    name="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  {
                    erremail.length > 0 && <span style={{ color: 'red' }}>{erremail}</span>
                  }
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
                  <fieldset >
                    <legend>Role</legend>
                    <label
                      style={{ fontSize: '15px' }}>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        onChange={(event) => {
                          setRole(event.target.value);
                        }}
                      />
                      Admin
                    </label>
                    <label
                      style={{ fontSize: '15px' }}>
                      <input
                        type="radio"
                        name="role"
                        value="radiologue"
                        onChange={(event) => {
                          setRole(event.target.value);
                        }}
                      />
                      Radiologue
                    </label>
                  </fieldset>
                  {
                    errrole.length > 0 && <span style={{ color: 'red' }}>{errrole}</span>
                  }
                </div>
                <br />
                <div className="footer-login ">
                  <button className='btn-first' onClick={handleSubmit} >Sign up</button>
                </div>
              </div>
              <div className="align">
                <div className="create-account">
                  <span className='log' onClick={() => nextPath('/')}>I already have an account</span>
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
export default withRouter(AuthSignup);
