import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from '@ohif/ui';
import '../auth.css'
import Header from './Header';
import { withRouter } from "react-router-dom";
function AjouterRadiologue() {
  const nextPath = (path) => {
    window.location = path;
  }
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  //error
  const [errnom, setErrNom] = useState('');
  const [errprenom, setErrPrenom] = useState('');
  const [erremail, setErrEmail] = useState('');
  const [alert, setAlert] = useState('');
  const [errpassword, setErrPassword] = useState('');
  const [errcpassword, setErrCPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForm()) {
      const user = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        role: 'radiologue',
      }
      axios.post('https://meddicombackend.herokuapp.com/users/register', user)
        .then((res) => {
          if (res.data === 'added') {
            setSuccess("Added")
            setError(true)
            nextPath('/radiologue');
          }
        })
      setPrenom('');
      setEmail('');
      setPassword('');
      setCPassword('');
    }
    else {
      setError(false)
      console.log("Error")
      nextPath('/ajouterradiologue');
    }
  }
  const validForm = () => {
    let formIsValid = true
    setErrNom('');
    setErrPrenom('');
    setErrEmail('');
    setErrPassword('');
    setErrCPassword('');
    setAlert('');
    if (nom === "") {
      formIsValid = false
      setErrNom('Last name is required!')
    }
    if (prenom === "") {
      formIsValid = false
      setErrPrenom('First name is required!')
    }
    if (email === "") {
      formIsValid = false
      setErrEmail("Email is required!");
    }
    if (!email.includes("@")) {
      formIsValid = false
      setErrEmail("Includes @ in your email!");
    }
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
      setErrCPassword("Password and Confirm password are not matching!");
      setErrPassword("Password and Confirm password are not matching!");
    }

    if (nom === "") {
      formIsValid = false
      setAlert('Last name is required!')
    } else if (prenom === "") {
      formIsValid = false
      setAlert('First name is required!')
    } else if (email === "") {
      formIsValid = false
      setAlert("Email is required!");
    } else if (!email.includes("@")) {
      formIsValid = false
      setAlert("Includes @ in your email!");
    } else if (password === "") {
      formIsValid = false
      setAlert("password is required!");
    } else
      if (password.length < 6) {
        formIsValid = false
        setAlert("Password must be 6 char!");
      } else if (cpassword === "") {
        formIsValid = false
        setAlert("Confirm password is required!");
      } else if (cpassword.length < 6) {
        formIsValid = false
        setAlert("Confirm password must be 6 char!");
      } else if (password !== cpassword) {
        formIsValid = false
        setAlert("Password and Confirm password are not matching!");
      }
    return formIsValid;
  }
  return (
    <>
      <Header />
      <div className="container" style={{ backgroundColor: '#0d0631' }}><div className="card-items">
        <div className="card-signup">
          <div className="block">
            <div className="input-t">
              <div className="top-login">
                <label className="text"><center>Add Radiologue</center></label>
              </div>
              {
                error
                  ?
                  <div class="alert alert-success" role="alert" >
                    {success}
                  </div>
                  :

                  <div class="alert alert-danger" role="alert" >
                    {alert}
                  </div>
              }
              <div className="content">
                <input type="text"
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
                      placeholder='Password'
                    />
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
                      placeholder='Confirm Password'
                    />
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
                <button className='btn-first' onClick={handleSubmit} >Add radiologue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
export default withRouter(AjouterRadiologue);
