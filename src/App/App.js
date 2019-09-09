import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form/Form';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import { fetchCoWorkers, deleteCoWorker } from '../apiCalls';
import { getCoWorkers, removeCoWorker, isLoading, hasErrored } from '../actions';

import './App.css';

export class App extends Component {
  componentDidMount = async () => {
    const { getCoWorkers, isLoading, hasErrored } = this.props;
    try {
      const coWorkers = await fetchCoWorkers();
      getCoWorkers(coWorkers);
      isLoading(false)
    } catch ({ message }) {
      isLoading(false);
      hasErrored(message)
    }
  }

  removeCoWorker = async (e, id) => {
    e.stopPropagation();
    const { removeCoWorker, isLoading, hasErrored } = this.props;
    try {
      isLoading(true);
      await deleteCoWorker(id);
      removeCoWorker(id);
      isLoading(false);
    } catch({ message }) {
      isLoading(false);
      hasErrored(message)
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

export const mapStateToProps = state => ({
  ...state
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    isLoading,
    hasErrored,
    getCoWorkers,
    removeCoWorker
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
