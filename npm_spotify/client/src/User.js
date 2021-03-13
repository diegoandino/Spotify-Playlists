import React, { useState, useEffect } from 'react';
import './App.css';

const get_user = () => fetch('/userinfo').then(res => res.json());
function User() {
  const [user, setUser] = useState({ data: [] });

  useEffect(() => {
    get_user().then(data => setUser(data)); 
  }, []);
  
  if (user)
    console.log('user: ', user);
  
  return (
    <div className="App">
        <div className="user">
            <div className="user-name-parent">
                <h3 className="user-name">{ user.display_name }</h3>
            </div>
            <div className="profile-img-parent">
                {user.images && user.images.map(img => 
                    <img src={ img.url } className="profile-img" /> 
                )}
            </div>
        </div>
    </div>
  );
}

export default User;
