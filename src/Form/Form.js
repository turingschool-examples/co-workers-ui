import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createCoWorker } from '../apiCalls';
import { addCoWorker, isLoading, hasErrored } from '../actions';
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

  createCoWorker = async e => {
    const { addCoWorker, isLoading, hasErrored } = this.props;
    e.preventDefault();
    try {
      isLoading(true);
      const newCoWorkerId = await createCoWorker({ ...this.state, id: Date.now() })
      addCoWorker({ ...this.state, id: newCoWorkerId })
      isLoading(false);
      this.clearInputs();
    } catch({ message }) {
      isLoading(false);
      hasErrored(message)
    }
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
      <header>
        <h1><span>co-</span>Workers</h1>
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
          <button onClick={this.createCoWorker}>
            Create New Co-Worker
          </button>
        </form>
       </header>
    )
  }
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    isLoading,
    hasErrored,
    addCoWorker
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(Form);