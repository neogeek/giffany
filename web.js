const restify = require('restify');

const server = restify.createServer();

const giffanyRoute = require('./src/routes/giffany/index.js');
const giffanyActionRoute = require('./src/routes/giffany/action.js');

server.use(restify.plugins.bodyParser());

server.post('/giffany', giffanyRoute);
server.post('/giffany/action', giffanyActionRoute);

server.listen(process.env.PORT || 8080);
