import React from 'react';
import './CoWorkerTab.css'
import online from '../assets/online.png'
import offline from '../assets/offline.png';
import deleteIcon from '../assets/delete.png';

const CoWorkerTab = ({ id, status, name, role, location, removeCoWorker, selectUser }) => {
  const onlineStatus = status ? online : offline;
  return (
  <li className="tab" onClick={() => selectUser(id)}>
    <img src={onlineStatus} alt='Online status' />
    <p>{name}</p>
    <p>{role}</p>
    <p>{location}</p>
    <img src={deleteIcon} alt="Delete icon" onClick={e => removeCoWorker(e, id)} />
  </li>
  )
}

export default CoWorkerTab