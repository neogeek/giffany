const restify = require('restify');

const server = restify.createServer();

const auth = require('./utils/auth.js');
const payloadParser = require('./utils/payloadParser.js');

const authorizeRoute = require('./src/routes/authorize.js');
const giffanyRoute = require('./src/routes/giffany/index.js');
const giffanyActionRoute = require('./src/routes/giffany/action.js');

server.get('/authorize', restify.queryParser(), authorizeRoute);
server.post('/giffany', restify.bodyParser(), auth, giffanyRoute);
server.post('/giffany/action', restify.bodyParser(), payloadParser, auth, giffanyActionRoute);

server.listen(process.env.PORT);
