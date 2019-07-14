import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      role: '',
      location: ''
    }
  }

  updateForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  makeNewCoWorker = e => {
    e.preventDefault();
    this.props.addCoWorker({ ...this.state, id: Date.now() });
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({ 
      image: '',
      name: '',
      role: '',
      location: ''
    });
  }

  render() {
    const { image, name, role, location } = this.state;
    return (
      <>
        <header>
          <h1>coWorkers</h1>
        </header>
        <form>
          <input 
            name="image"
            value={image}
            placeholder="https://"
            onChange={this.updateForm}
          />
          <input 
            name="name"
            value={name}
            placeholder="Name"
            onChange={this.updateForm}
          />
          <input 
            name="role"
            value={role}
            placeholder="Role"
            onChange={this.updateForm}
          />
          <input 
            name="location"
            value={location}
            placeholder="Location"
            onChange={this.updateForm}
          />
          <button onClick={this.makeNewCoWorker}>
            Create New Co-Worker
          </button>
        </form>
       </>
    )
  }
}

export default Form;