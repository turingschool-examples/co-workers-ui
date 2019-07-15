import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import Form from '../Form/Form';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import { fetchCoWorkers } from '../thunks/fetchCoWorkers';
import {createCoWorker, deleteCoWorker } from '../apiCalls';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coWorkers: [],
      error: ''
    }
  }

  async componentDidMount() {
    await this.props.fetchCoWorkers()
  }

  addCoWorker = async newCoWorker => {
    const { fetchCoWorkers } = this.props;
    try {
      await createCoWorker(newCoWorker);
      const coWorkers = await fetchCoWorkers();
      this.setState({ coWorkers });
    } catch({ message }) {
      this.setState({ error: message });
    }
  }

  removeCoWorker = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteCoWorker(id);
      const coWorkers = await fetchCoWorkers();
      this.setState({ coWorkers, selectedId: null });
    } catch({ message }) {
      this.setState({ error: message });
    }
  }

  render() {
    const { coWorkers, selectedId, errorMsg } = this.props;
    const foundUser = coWorkers.find(coWorker => coWorker.id === selectedId);
    return (
      <div className="app">
          <Form addCoWorker={this.addCoWorker} />
        <main>
          <Dashboard 
            coWorkers={coWorkers} 
            error={errorMsg} 
            removeCoWorker={this.removeCoWorker} 
          />
        <Profile selected={foundUser} />
        </main>
      </div>
    );
  }
}

export const mapStateToProps = ({ selectedId, isLoading, coWorkers, errorMsg }) => ({
  selectedId,
  isLoading,
  coWorkers,
  errorMsg
})

export const mapDispatchToProps = dispatch => (
   bindActionCreators({fetchCoWorkers}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
