const fs = require('fs');
const https = require('https');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./ssl/local.mediappv.tech.key'),
  cert: fs.readFileSync('./ssl/local.mediappv.tech.crt'),
};

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  https.createServer(httpsOptions, server).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://local.mediappv.tech:3000');
  });
});
