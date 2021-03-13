const express = require('express');
const app = express();
const port = 8000;

const client_id = '1928788efe924ab8a671fd9fdb8a6fce';
const redirect_uri = 'http://localhost:8000/callback';
const client_secret = '8abd5d27fc36473bb18b06143a36dc08';

let SpotifyWebApi = require('spotify-web-api-node');

// Static Imports
app.use(express.static('views'));
app.use('/css', express.static(__dirname + 'views/css'));


let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
});


// Routing
app.get('/', (req, res) => {
    res.redirect('http://localhost:8000/login');
})


app.get('/login', function(req, res) {
    let scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});


app.get('/callback', async (req,res) => {
    const { code } = req.query;
    console.log(code)
    
      spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires in'];
        
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        
        console.log('Access Token: ', access_token);
        res.redirect('http://localhost:3000/home');
        
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('Refreshed Access Token');
          console.log('Access Token: ', access_token);
  
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(err => {
        console.log('Error getting tokens: ', err);
      }) 
});


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// Get OAuth Token
app.post('https://accounts.spotify.com/api/token', (req, res) => {
  console.log(req.body);
}); 


app.get('/userinfo', async (req,res) => {
  try {
    var result = await spotifyApi.getMe();
    console.log(result.body);
    res.status(200).send(result.body)
  } 
  
  catch (err) {
    res.status(400).send(err)
  }
});


app.get('/playlists', async (req,res) => {
    try {
      
      var result = await spotifyApi.getUserPlaylists();
      console.log(result.body);
      res.status(200).send(result.body);
    } 
    
    catch (err) {
      res.status(400).send(err)
    }
  });

app.listen(port);