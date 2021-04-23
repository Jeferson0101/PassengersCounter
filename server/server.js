const http = require('http');
const app = require('./src/app');
const { client } = require('./src/database');
const port = 3300;

client.connect();
const server = http.createServer(app);
server.listen(port);
