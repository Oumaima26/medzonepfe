import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import './admin.css';
export default class ModifierRadiologue extends Component {
  constructor(props) {
    super(props);

    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nom: '',
      prenom: '',
      password: '',
      email: ''
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    axios.get('https://meddicombackend.herokuapp.com/users/afficher/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          password: response.data.password
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    })
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const radiologue = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
    }

    console.log(radiologue);

    axios.put('https://meddicombackend.herokuapp.com/users/update/' + this.props.match.params.id, radiologue)
      .then(res => console.log(res.data));

    window.location = '/radiologue';
  }

  render() {
    return (
      <div>
        <Header />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="content-header" >
                <div className="wrapper">
                  <div className="form-wrapper">
                    <h1 >
                      <center>
                        <div >Edit Radiologue</div>
                      </center>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                      <div className="produit">

                        <label htmlFor="nom">Nom :</label>
                        <input
                          className="form-control"
                          required
                          type="text"
                          placeholder="Nom"
                          name="nom"
                          value={this.state.nom}
                          onChange={this.onChangeNom}
                        />
                      </div>
                      <div className="produit">
                        <label htmlFor="prenom">Prenom :</label>
                        <input
                          className="form-control"
                          required
                          type="text"
                          placeholder="Prenom"
                          name="prenom"
                          value={this.state.prenom}
                          onChange={this.onChangePrenom}
                        />
                      </div>

                      <div className="produit">

                        <label htmlFor="email">Email :</label>
                        <input
                          className="form-control"
                          type="email"
                          required
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                        />
                      </div>
                      <div className="ajouter">
                        <input type="submit" value="Edit radiologue" className="btn btn-primary" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    )
  }
}
