import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Radiologue.css';
import { Icon } from '@ohif/ui';
//import SweetAlert from 'react-bootstrap-sweetalert';
import Header from './Header';
const Radiologue = props => (
  <tr>
    <td>{props.radiologue.nom}</td>
    <td>{props.radiologue.prenom}</td>
    <td>{props.radiologue.email}</td>
    <td><button>
      <Link to={"/modifierradiologue/" + props.radiologue._id}>
        <Icon name='edit' style={{ "fontSize": "20px" }} />
      </Link></button>
      <button>
        <a href="/radiologue" onClick={(e) => { props.deleteThisGoal(e, props.radiologue._id) }}>
          <Icon name='trash' style={{ "fontSize": "20px" }} />
        </a></button>
    </td>
  </tr>
)

export default class RadiologueList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduitRadiologue = this.deleteRadiologue.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    //this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = { radiologues: [], alert: null };
  }

  componentDidMount() {
    axios.get('https://meddicombackend.herokuapp.com/users/' + 'radiologue')
      .then(response => {
        this.setState({ radiologues: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRadiologue(id) {
    axios.delete('https://meddicombackend.herokuapp.com/users/supprimer/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      radiologues: this.state.radiologues.filter(el => el._id !== id),
      alert: null
    })
  }

  deleteThisGoal(e, id) {
    e.preventDefault();
    this.deleteRadiologue(id)
    /*const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Supprimer"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Supprimer ce radiologue?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteRadiologue(id)}
      >
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });*/
  }
  /*onCancelDelete() {
    this.setState({
      alert: null
    });
  }
*/
  radiologueList() {
    return this.state.radiologues.map(currentradiologue => {
      return <Radiologue radiologue={currentradiologue} deleteThisGoal={this.deleteThisGoal} key={currentradiologue._id} />;
    })
  }

  render() {
    return (
      <div >
        <Header />
        <div className="wrapper">
          <div className="content-wrapper" style={{ width: "80%", justifyContent: 'center', display: 'flex' }}>
            <section className="form-wrapper " style={{ width: "70%", backgroundColor: '#ffffff' }}>
              <div className="container-fluid" >
                <Link to="/ajouterradiologue">
                  <button className="btn btn-primary" type="submit"
                    style={{ "float": "right", "position": "relative" }}>
                    Add radiologue</button>
                </Link>
                <br />
                <br />
                <h1 >
                  <center>
                    <div >Radiologue</div>
                  </center>
                </h1>
                <br />
                <form >
                  <table style={{ width: "100%" }} className="table col-md-6 mx-auto">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody >
                      {this.radiologueList()}
                    </tbody>
                  </table>{this.state.alert}
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}
