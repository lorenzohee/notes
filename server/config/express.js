const path = require('path');
const express = require('express');
const httpError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport')
const setLogger = require('./logger')

if (config.env !== 'development') {
  const { enableProdMode } = require('@angular/core');
  enableProdMode();
}

const app = express();

if (config.env === 'development') {
  setLogger(app, 'joke')
}else {
  setLogger(app, 'combined')
}

var distDir = '../../dist/';

app.use(express.static(path.join(__dirname, distDir)))
app.use(express.static(path.join(__dirname, '../../uploads')))
app.use(express.static(path.join(__dirname, '../../audio')))
app.use(express.static(path.join(__dirname, '../../vendor')))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

// swagger initial
if (config.env === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  setLogger(app, 'combined', err.message)
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
