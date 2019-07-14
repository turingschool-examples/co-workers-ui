import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import { getCoWorkers } from '../apiCalls';
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

  render() {
    const { coWorkers, error } = this.state;
    return (
      <div className="App">
        <Dashboard coWorkers={coWorkers} error={error} />
        <Profile />
      </div>
    );
  }
}

export default App;
