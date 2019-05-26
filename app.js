var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var toastr = require('express-toastr');
// var session = require('express-session');
var session = require('cookie-session');
var engine = require('ejs-locals');
var mongoose = require('mongoose');
var config = require('./config.js');
var db = require('./config/config');
var cors = require('cors');

mongoose.Promise = global.Promise;
 
var app = express();

app.get('/', function (req, res) {
  res.redirect('/admin/login');
});

app.set('superSecret', config.secret);
// view engine setup

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/userImage', express.static('userImage'));
app.use('/affiliations', express.static('affiliations'));
app.use(toastr());

// app.use(session({ secret: 'ylist@123', cookie: { maxAge: 60000 }}));
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['H2ERY'],
  cookie: {
    secure: true,
    path: '/',
    expires: expiryDate
  }
}))

var sess;
module.exports = sess;

app.use(cors());
// Route
var users = require('./routes/users')(app);
var companymaster = require('./routes/companymaster')(app);
var machine = require('./routes/machine')(app);
var machine = require('./routes/usermaster')(app);
var affiliation = require('./routes/affiliation')(app);
var auth = require('./routes/auth')(app);
var cms = require('./routes/cms')(app);
var contactus = require('./routes/contactus')(app);
var blog = require('./routes/blog')(app);
var matches = require('./routes/matches')(app);
var host = require('./routes/host')(app);
var authAdmin = require('./routes/admin/auth')(app);
var adminUsers = require('./routes/admin/users')(app);
var adminAffiliations = require('./routes/admin/affiliations')(app);
var adminBlogs = require('./routes/admin/blogs')(app);
var adminCms = require('./routes/admin/cms')(app);
var adminContact = require('./routes/admin/contacts')(app);
var adminHosts = require('./routes/admin/hosts')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;