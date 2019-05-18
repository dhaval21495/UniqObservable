var mongoose = require("mongoose");
var User = require("../../models/User");
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
var config = require('../../config');
const main_ids = require('../../config/email_id');
var fullUrl = '';
var transporter = nodemailer.createTransport({
    host: main_ids.host_name,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: main_ids.email_id,
        pass: main_ids.email_password
    }
}, {
    from: 'Yale University <' + main_ids.from_email + '>',

});

var authController = {};

function dateFormate(callback) {
  var options = {
    timeZone: "America/New_York",
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  var formatter = new Intl.DateTimeFormat([], options);
  var currentDateTime = formatter.format(new Date());
  var chat_date = dateFormat(currentDateTime, 'yyyy-m-d HH:MM:ss');
  console.log(chat_date);
  return callback({
    date: chat_date
  });
}

authController.login = function (req, res) {
    console.log(req.session);
    res.render('../views/template/login', {
        message: '',
        title: 'Y List',
        name: 'Priyanka',
    });
};

authController.loginUser = function (req, res) {
    User.findOne({
        role_type: 1,
        email: req.body.email
    }, function (err, user) {
        if (!user) {
            res.status(400).json({
                message: 'Wrong Email Id or Password ',
                data: user,
            });
        } else {
            var user_password = user.password;
            var password = req.body.password;
            var is_pass = passwordHash.verify(password, user_password);
            if (is_pass != true) {
                res.status(400).json({
                    message: 'Wrong Email Id or Password',
                    data: '',
                });
            } else {
                const payload = {
                    email: user.email,
                    password: user.password
                };
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                sess = req.session;
                sess.email = req.body.email;
                sess.user_id = user._id;
                res.status(200).json({
                    message: 'You have been logged in successfully.',
                    data: user,
                    token: token
                });
            }
        }
    });
};

authController.forgotePassword = function (req, res) {
    res.render('../views/template/forgote_password', {
        message: '',
        title: 'Y List',
    });
};

authController.adminForgotePassword = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (!user) {
            res.status(400).json({
                message: 'Email is not registered',
                data: '',
            });
        } else {
            //
            dateFormate(getDateFormateCallBack);
            function getDateFormateCallBack(chat_date) {
                fullUrl = req.protocol + '://' + req.get('host');
                var mailOptions = {
                    to: user.email, // list of receivers
                    subject: "Forgot Password", // Subject line
                    text: "Confirm Your Account", // plaintext body
                    html: "<b>For Forgot Password</b> <a href=" + fullUrl + "/admin/change-password/" + Date.parse(chat_date.date) + "/" + user._id + ">Click Here</a>" // html body
                }

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        res.status(400).json({
                            message: error,
                            data: '',
                        });
                    } else {
                        res.status(200).json({
                            message: 'Forgot Password link send to your account',
                            data: '',
                        });
                    }
                });
            }
        }
    })
};

authController.adminchangePassword = function (req, res) {
    res.render('../views/template/change_password', {
        title: 'Change Password',
        user_id: req.params.id,
        time: req.params.time,
    });
};

authController.changePassword = function (req, res) {
    var date2 = req.body.time;
    var hours = Math.abs(new Date().getTime() - date2) / 36e5;
    if (hours > 24) {
        res.status(400).json({
            message: 'Your link has been expired',
            data: '',
        });
    } else {
        if (req.body.password === req.body.conform_password) {
            req.body['password'] = passwordHash.generate(req.body.password);
            User.findByIdAndUpdate(req.body.user_id, {
                $set: {
                    password: req.body.password
                }
            }, {
                new: true
            }, function (err, user) {
                console.log(user);
                if (err) {
                    res.status(400).json({
                        message: 'Error',
                        data: user,
                    });
                } else {
                    res.status(200).json({
                        message: 'Your password change successfully',
                        data: user,
                    });
                }
            });
        } else {
            res.status(400).json({
                message: 'Confirm your password',
                data: '',
            });
        }
    }
};

authController.logoutUser = function (req, res) {
    req.session.email = null
    res.redirect('/admin/login');
};
module.exports = authController;
