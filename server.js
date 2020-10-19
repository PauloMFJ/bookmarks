// Install express server
const express = require('express');
const path = require('path');
const app = express();

// Handle robots.txt
app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/bookmarks'));

app.get('/*', function(req,res) {
  const index = path.join(__dirname + '/dist/bookmarks/index.html');
  res.sendFile(index);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);