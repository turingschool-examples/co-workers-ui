import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form/Form';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import { fetchCoWorkers, postCoWorker, deleteCoWorker } from '../apiCalls';
import { setCoWorkers, updateLoading, hasErrored } from '../actions';
import './App.css';

export class App extends Component {
  async componentDidMount() {
    const { setCoWorkers, updateLoading, hasErrored } = this.props;
    try {
      updateLoading(true);
      const coWorkers = await fetchCoWorkers();
      updateLoading(false);
      setCoWorkers(coWorkers);
    } catch ({ message }) {
      updateLoading(false);
      hasErrored(message);
    }
  }

  addCoWorker = async newCoWorker => {
    const { setCoWorkers, updateLoading, hasErrored } = this.props;
    try {
      updateLoading(true);
      await postCoWorker(newCoWorker);
      const coWorkers = await fetchCoWorkers();
      updateLoading(false);
      setCoWorkers(coWorkers);
    } catch({ message }) {
      updateLoading(false);
      hasErrored(message);
    }
  }

  removeCoWorker = async (e, id) => {
    e.stopPropagation();
    const { updateLoading, setCoWorkers, hasErrored } = this.props;
    try {
      updateLoading(true);
      const coWorkers = await deleteCoWorker(id);
      updateLoading(false);
      setCoWorkers(coWorkers);
    } catch({ message }) {
      updateLoading(false);
      hasErrored(message);
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
  bindActionCreators({
    setCoWorkers,
    updateLoading,
    hasErrored
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
