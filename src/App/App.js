import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../Form/Form';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import { getCoWorkers, createCoWorker, deleteCoWorker } from '../apiCalls';
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
    try {
      const coWorkers = await getCoWorkers();
      this.setState({ coWorkers });
    } catch({ message }) {
      this.setState({ error: message });
    }
  }

  addCoWorker = async newCoWorker => {
    try {
      await createCoWorker(newCoWorker);
      const coWorkers = await getCoWorkers();
      this.setState({ coWorkers });
    } catch({ message }) {
      this.setState({ error: message });
    }
  }

  removeCoWorker = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteCoWorker(id);
      const coWorkers = await getCoWorkers();
      this.setState({ coWorkers, selectedId: null });
    } catch({ message }) {
      this.setState({ error: message });
    }
  }

  render() {
    const { coWorkers, error } = this.state;
    const { selectedId } = this.props;
    const foundUser = coWorkers.find(coWorker => coWorker.id === selectedId);
    return (
      <div className="app">
          <Form addCoWorker={this.addCoWorker} />
        <main>
          <Dashboard 
            coWorkers={coWorkers} 
            error={error} 
            removeCoWorker={this.removeCoWorker} 
          />
        <Profile selected={foundUser} />
        </main>
      </div>
    );
  }
}

export const mapStateToProps = ({ selectedId }) => ({
  selectedId
})

export default connect(mapStateToProps)(App);
