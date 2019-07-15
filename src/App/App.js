import React, { Component } from 'react';
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
      selectedId: null,
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

  selectUser = id => {
    this.setState({ selectedId: id});
  }

  render() {
    const { coWorkers, selectedId, error } = this.state;
    const foundUser = coWorkers.find(coWorker => coWorker.id === selectedId);
    return (
      <div className="app">
          <Form addCoWorker={this.addCoWorker} />
        <main>
          <Dashboard 
            coWorkers={coWorkers} 
            error={error} 
            removeCoWorker={this.removeCoWorker} 
            selectUser={this.selectUser}
          />
        <Profile selected={foundUser} />
        </main>
      </div>
    );
  }
}

export default App;
