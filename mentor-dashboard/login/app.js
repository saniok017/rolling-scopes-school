const express = require('express');
const middlewares = require('./middleware/middleware');
const config = require('./config/config');
const routesHandle = require('./routes/routesHandle');

const app = express();

middlewares(app);

routesHandle(app);

app.listen(config.port);
