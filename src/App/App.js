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
      error: ''
    }
  }

  async componentDidMount() {
    try {
      const coWorkers = await getCoWorkers();
      this.setState({ coWorkers });
    } catch(error) {
      this.setState({ error });
    }
  }

  addCoWorker = async newCoWorker => {
    try {
      await createCoWorker(newCoWorker);
      const coWorkers = await getCoWorkers();
      this.setState({ coWorkers });
    } catch(error) {
      this.setState({ error });
    }
  }

  removeCoWorker = async id => {
    try {
      await deleteCoWorker(id);
      const coWorkers = await getCoWorkers();
      this.setState({ coWorkers });
    } catch(error) {
      this.setState({ error });
    }
  }

  render() {
    const { coWorkers, error } = this.state;
    return (
      <div className="App">
        <main>
          <Form addCoWorker={this.addCoWorker} />
          <Dashboard 
            coWorkers={coWorkers} 
            error={error} 
            removeCoWorker={this.removeCoWorker} 
          />
        </main>
        <Profile />
      </div>
    );
  }
}

export default App;
