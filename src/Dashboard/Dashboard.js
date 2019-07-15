import React from 'react';
import CoWorkerTab from '../CoWorkerTab/CoWorkerTab';
import './Dashboard.css';

const Dashboard = ({ coWorkers, error, removeCoWorker, selectedId }) => {
  const coWorkerTabs = coWorkers.map(coWorker => {
    return <CoWorkerTab {...coWorker} 
      key={coWorker.id} 
      removeCoWorker={removeCoWorker} 
    />
  })
  return (
    <section className="coworker-tabs">
      {error && <h2>{error}</h2>}
      {coWorkerTabs}    
    </section>     
  )
}

export default Dashboard;