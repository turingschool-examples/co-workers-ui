import React from 'react';
import CoWorkerTab from '../CoWorkerTab/CoWorkerTab';
import './Dashboard.css';

const Dashboard = ({ coWorkers, error }) => {
  const coWorkerTabs = coWorkers.map(coWorker => {
    return <CoWorkerTab {...coWorker} key={coWorker.id} />
  })
  return (
    <section className="coworker-tabs">
      {/* {error & error} */}
      {coWorkerTabs}    
    </section>     
  )
}

export default Dashboard;