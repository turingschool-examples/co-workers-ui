import React from 'react';
import './Profile.css'

const Profile = ({ selected }) => {
  const status = selected && selected.status ? 'Online' : 'Offline'
  return (
    <aside>
      {!selected && <h3>Please select a user.</h3>}
      {selected &&
        <section>
          <img className="profile-pic" src={selected.image} alt='' />
          <h3>{selected.name}</h3>
          <p><span>Role: </span>{selected.role}</p>
          <p><span>Online Status: </span>{status}</p>
          <p><span>Location: </span>{selected.location}</p>
        </section>
      }
    </aside>
  )
}

export default Profile;

