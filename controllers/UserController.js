var mongoose = require("mongoose");
var User = require("../models/User");
var Matches = require("../models/Matches");
var Reportuser = require("../models/Reportuser");
const main_ids = require('../config/email_id');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var multer = require('multer');
var lodash = require('lodash');
var moment = require('moment');
var fs = require('fs');
var fullUrl = main_ids.FrontUrl;
var file_name = '';
var transporter = nodemailer.createTransport({
    host: main_ids.host_name,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: main_ids.email_id,
        pass: main_ids.email_password
    }
}, {
    from: 'Yale University <'+main_ids.from_email+'>',

});

var userController = {};

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

// Save User
userController.save = function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (user) {
                res.status(400).json({
                    message: "Email ID is Used. Try Another.",
                    data: '',
                });
            } else {
                req.body['password'] = passwordHash.generate(req.body.password);
                req.body['role_type'] = 2;
                req.body['is_login'] = true;
                req.body['is_confirmed'] = true;
                var user = new User(req.body);
                user.save(function (err) {
                    if (err) {
                        res.status(400).json({
                            message: err,
                            data: '',
                        });
                    } else {
                        res.status(200).json({
                            message: 'Your profile has been registered successfully.',
                            data: user,
                        });
                    }
                });
                
            }
        });
    
};

// User Confirm
userController.confirm = function (req, res) {
    var date2 = req.params.time;
    var hours = Math.abs(new Date().getTime() - date2) / 36e5;
    console.log("save date : "+hours);
    if (hours > 48) {
        res.status(400).json({
            message: 'Your link has been expired',
            data: '',
        });
    } else {
        User.findByIdAndUpdate(req.params.id, {
            $set: {
                is_confirmed: 1
            }
        }, {
            new: true
        }, function (err, user) {
            if (err) {
                res.status(400).json({
                    message: 'Error',
                    data: user,
                });
            } else {
                res.status(200).json({
                    message: 'Your account has been confirmed',
                    data: user,
                });
            }
        });
    }
};

// Change Password After Login
userController.changePassword = function (req, res) {
    if (req.body.password === req.body.confirm_password) {
        User.findOne({
            _id: req.params.id
        }, function (err, old_user) {
            if (err) {
                res.status(400).json({
                    message: 'user not found',
                    data: '',
                });
            } else {
                var user_password = old_user.password;
                var old_password = req.body.old_password;
                var is_pass = passwordHash.verify(old_password, user_password);
                if (is_pass != true) {
                    res.status(400).json({
                        message: 'Old password is wrong',
                        data: '',
                    });
                } else {
                    req.body['password'] = passwordHash.generate(req.body.password);
                    User.findByIdAndUpdate(req.params.id, {
                        $set: {
                            password: req.body.password
                        }
                    }, {
                        new: true
                    }, function (err, user) {
                        if (err) {
                            res.status(400).json({
                                message: 'user not found',
                                data: '',
                            });
                        } else {
                            res.status(200).json({
                                message: 'Your password change successfully',
                                data: user,
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.status(400).json({
            message: 'Confirm your password',
            data: '',
        });
    }
};

// getUserByUserID
userController.getUserByUserID = function (req, res) {
    var userId = req.params.id || null;
    if (userId) {
        getUser(userId, getUserCallBack);
    } else {
        res.status(400).json({
            message: 'userID id required.',
            data: ''
        });
    }

    function getUserCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'userID id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'User Data.',
                data: response.data
            });
        }
    }
};

function getUser(userId, callback) {
    // var id = userId || null;
    User.findById(userId, user);

    function user(err, user) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!user) {
            return callback({
                error: true,
                data: "User not found."
            });
        } else {
            return callback({
                error: false,
                data: user
            });
        }
    }
}
//

// Update 
userController.update = function (req, res) {
    var year = moment().diff(req.body.date_of_birth, "years", false);
    if (35 < year) {
        res.status(400).json({
            message: "You must be younger than 35 years",
            data: '',
        });
    } else {
        var userData = req.body;
        req.body['user_id'] = req.params.id;
        if (req.body.profile_image != undefined) {
            var matches = req.body.profile_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            var data = new Buffer(matches[2], 'base64');
            var imageName = Date.now() + '.jpg';
            fs.writeFile('userImage/' + imageName, data, function (err) {
                if (!err) {
                    req.body['profile_image'] = imageName;
                    _update(req.params.id, userData, function (response) {
                        res.status(200).json({
                            message: response.message,
                            data: response.data
                        });
                    });
                } else {}
            });
        } else {
            _update(req.params.id, userData, function (response) {
                res.status(200).json({
                    message: response.message,
                    data: response.data
                });
            });
        }
    }
};

function _update(userID, data, callback) {
    User.findByIdAndUpdate(userID, data, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            User.findById(userID).exec()
                .then(function (user) {
                    return callback({
                        message: "Your profile has been updated successfully",
                        data: user
                    });
                })
        }
    });
}
//

// getAllUser
userController.getAllUser = function (req, res) {
    // Date
    // var newDate = new Date();
    // var date = newDate.getDate();
    // var month = newDate.getMonth();
    // var year = newDate.getFullYear();

    // var currentDate = year + "-" + (month + 1) + "-" + date;
    //
    var interested_in = '';
    var looking_for = "";
    getUser(req.params.id, getUserCallBack);

    function getUserCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'userID id required.',
                data: ''
            });
        } else {
            var perPage = 8;
            var page = req.query.page || 1;
            interested_in = response.data.interested_in;
            looking_for = response.data.looking_for;

            var query = User
                .find({
                    role_type: 2
                })
                .populate('yale_affiliation')
                .where('looking_for').equals(looking_for)
                .where('status').equals(true)
                .where('is_confirmed').equals(true)
                .where("_id").ne(req.params.id);
            if (interested_in == "All") {
              query.where("gender").in(["Male", "Female", "Other", "All"]);
            } else {
              query.where("gender").equals(interested_in);  
            }
            if (req.body.name !== '' && typeof req.body.name != 'undefined') {
                query.where({
                    name: new RegExp(req.body.name, 'i')
                });
            }
            if (req.body.age !== '' && typeof req.body.age != 'undefined') {
                var gt = new Date(new Date().getFullYear() - req.body.age[0], "1", "-30");
                var gtdate = gt.getDate();
                var gtmonth = gt.getMonth();
                var gtyear = gt.getFullYear();

                var lt = new Date(new Date().getFullYear() - req.body.age[1], "1", "-30");
                var ltdate = lt.getDate();
                var ltmonth = lt.getMonth();
                var ltyear = lt.getFullYear();

                var gtDate = gtyear + "-" + (gtmonth + 1) + "-" + gtdate;
                var ltDate = ltyear + "-" + (ltmonth + 1) + "-" + ltdate;
                
                query.where('date_of_birth').gt(ltDate).lt(gtDate);
            }
            if (req.body.affiliations !== '' && typeof req.body.affiliations != 'undefined') {
                query.where('yale_affiliation').equals(req.body.affiliations);
            }
            query.sort({
                created_at: -1
            });
            query.exec(function (err, users) {
                query.count().exec(function (err, count) {
                    query.skip((perPage * page) - perPage);
                    query.limit(perPage);
                    if (err) {
                        res.status(400).json({
                            message: err,
                            data: '',
                        });
                    } else {
                        var final_data = [];
                        async function test() {
                            for (let person of users) {
                                let result = await getData(person._id);
                                var test = person;
                                var final_array = test.toObject();
                                final_array.like_status = result;
                                final_data.push(final_array);
                            }
                        }

                        function getData(person_id) {
                            return new Promise((resolve, reject) => {
                                getMatches(req.params.id, person_id, getDetailUserCallBack);
                                var like_status = 0;

                                function getDetailUserCallBack(getDetairesponse) {
                                    like_status = getDetairesponse;
                                }
                                setTimeout(() => {
                                    resolve(like_status);
                                }, 1000);
                            });
                        }
                        test().then(() => {
                            res.status(200).json({
                                message: 'User List',
                                data: final_data,
                                image_url: req.protocol + '://' + req.get('host'),
                                page: Math.ceil(count / perPage),
                                current: page,
                            });
                        })
                    }

                })
            })
        }
    }
}

// getUserByUserID
userController.getUserDetailByUserID = function (req, res) {
    var userId = req.params.user_id || null;
    var matchesId = req.params.matches_id || null;
    if (typeof userId != '' && typeof matchesId != '') {
        getUserDetail(userId, matchesId, getUserDetailCallBack);
    } else {
        res.status(400).json({
            message: 'userID id required and matchesId id required.',
            data: ''
        });
    }

    function getUserDetailCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'userID id required.',
                data: ''
            });
        } else {
            getMatches(userId, matchesId, getDetailUserCallBack);

            function getDetailUserCallBack(getDetairesponse) {
                var user_data = response.data;
                var getUserDetail = user_data.toObject();
                getUserDetail.like_status = getDetairesponse;
                res.status(200).json({
                    message: 'User Data.',
                    data: getUserDetail,
                    image_url: req.protocol + '://' + req.get('host')
                });
            }
        }
    }
};

function getUserDetail(userId, matchesId, callback) {
    // var id = userId || null;
    User.findById(matchesId).populate('yale_affiliation').exec(function (err, users) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!users) {
            return callback({
                error: true,
                data: "User not found."
            });
        } else {
            return callback({
                error: false,
                data: users
            });
        }
    });
}

function getMatches(user_id, partner_id, callback) {
    Matches.findOne({
        $or: [{
            $and: [{
                user_id: user_id
            }, {
                partner_id: partner_id
            }],
        }, {
            $and: [{
                user_id: partner_id
            }, {
                partner_id: user_id
            }]
        }],
    }, function (err, results) {
        if (!results) {
            var like_status = 0;
            return callback(like_status);
        } else {
            var like_status = 0;
            if (results.user_like == user_id) {
                like_status = 1;
            }
            if (results.partner_like == user_id) {
                like_status = 1;
            }
            return callback(like_status);
        }
    });
}

userController.logOut = function (req, res) {
    var logout_Data = {
        is_login: false
    };

    User.findByIdAndUpdate(req.params.id, logout_Data, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'User has been logged out successfully.',
                data: ''
            });
        }
    });
};

userController.reportUser = function (req, res) {
    var report_data = {
        u_id : req.body.u_id,
        to_id : req.body.to_id,
        msg : req.body.msg
    };
    var reportuser = new Reportuser(report_data);
        reportuser.save(reportuser)
          .then((response) => {
            res.status(200).json({
                message: 'Report has been sent successfully.',
                data: ''
            });
        }).catch(function (err) {
            console.log(err);
            res.status(400).json({
                message: 'Something went wrong, please try again.',
                data: ''
            });
        });
};

module.exports = userController;
