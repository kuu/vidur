'use strict';

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    config = require('config'),
    youTubeParser = require('youtube-parser');

var app = express(),
    port = process.env.PORT || 3030,
    BASE_DIR = path.join(__dirname, '../');

app.use(express.static(BASE_DIR + 'dist'));

app.get('/api/extract', function (req, res) {
  var url = decodeURIComponent(req.query.url);
  youTubeParser.getURL(url, {
    quality: 'medium',
    container: 'mp4'
  }).then(
    function (d) {
      if (d && d.length > 0) {
        res.status(200).send(d[0].url);
      } else {
        res.sendStatus(500);
      }
    },
    function (e) {
      res.sendStatus(500);
    }
  );
});

// Start server
if (require.main === module) {
  console.log('Server listening on port %s', port);
  app.listen(port);
}

module.exports = app;
