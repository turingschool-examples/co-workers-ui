import React from 'react';
import './Profile.css'

const Profile = ({ selected }) => {
  const status = selected && selected.status ? 'Online' : 'Offline'
  return (
    <aside>
      {!selected && <h3>Please select a user.</h3>}
      {selected && <img className="profile-pic" src={selected.image} alt='' />}
      {selected && <h3>{selected.name}</h3>}
      {selected && <p><span>Role: </span>{selected.role}</p>}
      {selected && <p><span>Online Status: </span>{status}</p>}
      {selected && <p><span>Location: </span>{selected.location}</p>}
    </aside>
  )
}

export default Profile;

