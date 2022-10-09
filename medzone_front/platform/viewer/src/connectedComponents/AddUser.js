import React, { Component } from 'react';
import axios from 'axios';
import './auth.css'
//import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from "react-router-dom";
class AjouterRadiologue extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }
  constructor(props) {
    super(props);
    /*.successAlert = this.successAlert.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.erreurAlert = this.erreurAlert.bind(this);*/
    this.state = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
      alert: null,
    };
  }
  /*
    successAlert() {
      const getAlert = () => (
        <SweetAlert
          success
          title="Good job!"
          onConfirm={() => this.onConfirm}
          onCancel={() => this.onCancel}>
          You clicked the button!
        </SweetAlert>
      );

      this.setState({
        alert: getAlert()
      });
    }

    onConfirm() {
      window.location = '/radiologues';
    }
    onCancel() {
      this.setState({
        alert: null
      });
    }
    erreurAlert() {
      const getAlert = () => (
        <SweetAlert
          warning
          cancelBtnBsStyle="default"
          title="Vérifier votre saisie"
          onConfirm={() => this.onCancel()}>
        </SweetAlert>
      );
      this.setState({
        alert: getAlert()
      });
    }
  */
  handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      role: 'radiologue',
    }
    axios.post('http://localhost:5000/users/register', user)
      .then((res) => {
        if (res.data === 'added') {
          //this.successAlert();
          window.location = '/';
        }
      }).catch(err => {
        console.log(err);
        if (err) {
          //this.erreurAlert();
          window.location = '/adduser';
        }
      }
      );
    this.setState({
      nom: '',
      prenom: '',
      email: '',
      password: '',
    })
  }
  handleChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <>
        <div className="container" style={{ backgroundColor: '#0d0631' }}><div className="card-items">
          <div className="card-signup">
            <div className="block">
              <div className="input-t">
                <div className="top-login">
                  <label className="text"><center>Add Radiologue</center></label>
                </div>
                <div className="content">
                  <input type="text" className="form__field" placeholder="First Name" name="nom" onChange={this.handleChange}></input>
                  <input type="text" className="form__field" placeholder="Last Name" name="prenom" onChange={this.handleChange}></input>
                  <input type="email" className="form__field" placeholder="Email" name="email" onChange={this.handleChange}></input>
                  <input type="password" className="form__field" placeholder="Password" name="password" onChange={this.handleChange}></input>
                </div>
                <div className="footer-login ">
                  <button className='btn-first' onClick={this.handleSubmit} >Add radiologue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
}
export default withRouter(AjouterRadiologue);
