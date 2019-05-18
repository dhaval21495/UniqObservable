var mongoose = require("mongoose");
var User = require("../models/User");
const main_ids = require("../config/email_id");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
var config = require("../config");
var dateFormat = require('dateformat');
const nodemailer = require("nodemailer");
var fullUrl = main_ids.FrontUrl;

var transporter = nodemailer.createTransport(
  {
    host: main_ids.host_name,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: main_ids.email_id,
      pass: main_ids.email_password
    }
  },
  {
    from: "Yale University <" + main_ids.from_email + ">"
  }
);

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

authController.login = function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (!user) {
        console.log(err);
        res.status(400).json({
          message:"Email ID you have entered doesn't match with any account. Register for an account",
          data: ""
        });
      } else {
        console.log(user.role_type);
        if (user.role_type != 2) {
          res.status(400).json({
            message: "User is not valid",
            data: ""
          });
        } else {
          if (user.is_confirmed == true) {
            if(user.status == true){
              var user_password = user.password;
              var password = req.body.password;
              var is_pass = passwordHash.verify(password, user_password);
              if (is_pass != true) {
                res.status(400).json({
                  message: "Password is wrong",
                  data: ""
                });
              } else {
                const payload = {
                  email: user.email,
                  password: user.password
                };
                var token = jwt.sign(payload, config.secret, {
                  expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                var UserDetail = user.toObject();
                UserDetail.token = token;
                //
                var login_Data = {
                  is_login: true
                };
                User.findByIdAndUpdate(user._id, login_Data, (err, entity) => {});
                //
                res.status(200).json({
                  message: "Welcome back",
                  data: UserDetail,
                  image_url: req.protocol + "://" + req.get("host")
                });
              }
            } else {
              res.status(400).json({
                message: "Your account has been blocked for some reason. Please contact administrator for further details.",
                data: ""
              });
            }
          } else {
            res.status(400).json({
              message: "Account not verified yet. Please check email to verify.",
              data: ""
            });
          }
        }
      }
    }
  );
};

authController.forgotPassword = function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (!user) {
        console.log("==== User Email Login Error ====");
        console.log(err);
        res.status(400).json({
          message: "Email ID you have entered doesn't match with any account",
          data: user
        });
      } else {
        dateFormate(getDateFormateCallBack);
        function getDateFormateCallBack(chat_date) { 
          console.log("Date "+chat_date.date);
          var mailOptions = {
      
            to: user.email, // list of receivers
            subject: "Forgot Password", // Subject line
            text: "Confirm Your Account", // plaintext body
            html:
              "<b>Follow the link below to reset your password: </b> <a href=" +
              fullUrl +
              "/users/change-password/" +
              Date.parse(chat_date.date) +
              "/" +
              user._id +
              ">Click Here</a><br> <p> From: <br> The YList Team </p>" // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
              res.status(400).json({
                message: "Can't send email",
                data: ""
              });
            } else {
              res.status(200).json({
                message: "Forgot Password link send to your account",
                data: ""
              });
            }
          });
        }
      }
    }
  );
};

authController.changePassword = function(req, res) {
  console.log("==== Confirm Your Account ====");
  console.log(req.params.time);
  var date2 = req.params.time;
  var hours = Math.abs(new Date().getTime() - date2) / 36e5;
  console.log(hours);
  if (hours > 48) {
    res.status(400).json({
      message: "Your link has been expired",
      data: ""
    });
  } else {
    if (req.body.password === req.body.confirm_password) {
      req.body["password"] = passwordHash.generate(req.body.password);
      User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: req.body.password
          }
        },
        {
          new: true
        },
        function(err, user) {
          console.log(user);
          if (err) {
            console.log("==== Change Password Error====");
            console.log(err);
            res.status(400).json({
              message: "Error",
              data: user
            });
          } else {
            console.log("==== Change Password Success====");
            res.status(200).json({
              message: "Your password change successfully",
              data: user
            });
          }
        }
      );
    } else {
      res.status(400).json({
        message: "Confirm your password",
        data: ""
      });
    }
  }
};

module.exports = authController;
