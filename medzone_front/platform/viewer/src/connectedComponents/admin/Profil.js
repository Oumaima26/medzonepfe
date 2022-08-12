import React, { Component } from 'react';
import axios from 'axios';

import './Radiologue.css';
import { Link } from 'react-router-dom';

import Header from './Header';
import { Icon } from '@ohif/ui';
class Profil extends Component {


  constructor(props) {
    super(props);

    this.state = {
      nom: '',
      prenom: '',
      email: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/admin/afficher/' + localStorage.getItem('idadmin'))
      .then(response => {
        this.setState({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="content-wrapper" style={{ width: "100%", justifyContent: 'center', display: 'flex' }}>
            <section className="form-wrapper " style={{ width: "50%", backgroundColor: '#ffffff' }}>
              <div className="container-fluid" >

                <Link to={"/modifiercompteadmin/" + localStorage.getItem('idadmin')}>
                  <Icon name='edit' style={{ "fontSize": "30px", "float": "right", "position": "relative" }} />
                </Link>
                <h1 >
                  <center>
                    <div >Profil</div>
                  </center>
                </h1>
                <br />
                <table className="table col-md-6 mx-auto" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Nom:</td>
                      <td>{this.state.nom}</td>
                    </tr>
                    <tr>
                      <td>Prenom:</td>
                      <td>{this.state.prenom}</td>
                    </tr>
                    <tr>
                      <td>Email:</td><td>{this.state.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}
export default Profil;
