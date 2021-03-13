import React, { Component, useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './App.css';

import User from './User';

const get_playlists = () => fetch('/playlists').then(res => res.json());
function App() {
  const [playlists, setPlaylists] = useState({ data: [] });

  useEffect(() => {
    get_playlists().then(data => setPlaylists(data)); 
  }, []);
  
  if (playlists)
    console.log('playlists: ', playlists.items);
  
  return (
    <div className="App">
    <User/>
    <div className="playlist-title-parent">
      <h1 className="playlist-title">Playlists</h1>
    </div>
     <div>
      {playlists.items && playlists.items.map(playlist => 
        <Jumbotron key={ playlist.id } className="playlist" fluid>
            <div className="playlist-name">
              { playlist.name }
            </div>

            <div>
              <form action={ playlist.external_urls.spotify } className="view-spotify-btn-parent">
                <input type="submit" value="View in Spotify" className="view-spotify-btn"/>
              </form>
            </div>
            <div>
                {playlist.images && playlist.images.map(img => 
                  ((img.height === 300 && img.url !== null) || 
                  (img.width === null && img.height === null && img.url !== null)) 
                  ? <img src={ img.url } /> : ''
                )}
            </div>
        </Jumbotron>
      )}
    </div>
  </div>
  );
}

export default App;
