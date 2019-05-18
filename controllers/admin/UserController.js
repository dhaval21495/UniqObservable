var mongoose = require("mongoose");
var User = require("../../models/User");
var Matches = require("../../models/Matches");
var Reportuser = require("../../models/Reportuser");
var Affiliation = require("../../models/Affiliation");
var passwordHash = require('password-hash');
const nodemailer = require('nodemailer');
const main_ids = require('../../config/email_id');
var dateFormat = require('dateformat');
var moment = require('moment');
var fs = require('fs');
var fullUrl = '';

var userController = {};
var affiliationData = {};

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

// Save User
userController.save = function (req, res) {
    var year = moment().diff(req.body.date_of_birth, "years", false);
    if (35 < year) {
        res.status(400).json({
            message: "You must be younger than 35 years",
            data: '',
        });
    } else if (18 > year) {
        res.status(400).json({
            message: "You must be 18 years old or above",
            data: '',
        });
    } else {
        var eMail = req.body.email.toLowerCase();
        req.body['email'] =  eMail + "" + req.body.email_host;
        User.findOne({ email: req.body.email }, function (err, user) {
            if (user) {
                res.status(400).json({
                    message: "Email ID is Used. Try Another.",
                    data: '',
                });
            } else {
                if (req.body.profile_image == '') {
                    res.status(400).json({
                        message: "Upload a Image File",
                        data: '',
                    });
                } else {
                    if (req.body.email_host !== '@yale.edu') {
                        res.status(400).json({
                            message: "Enter a Valid Email Host",
                            data: '',
                        });
                    } else {
                        var matches = req.body.profile_image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                        var data = new Buffer(matches[2], 'base64');
                        var imageName = Date.now() + '.jpg';
                        fs.writeFile('userImage/' + imageName, data, function (err) {
                            req.body['password'] = passwordHash.generate(req.body.password);
                            req.body['profile_image'] = imageName;
                            req.body['role_type'] = 2;
                            req.body['is_login'] = 0;
                            req.body["status"] = true;
                            var user = new User(req.body);
                            user.save(function (err) {
                                if (err) {
                                    res.status(400).json({
                                        message: err,
                                        data: '',
                                    });
                                } else {
                                    dateFormate(getDateFormateCallBack);
                                    function getDateFormateCallBack(chat_date) {
                                        //
                                        fullUrl = req.protocol + '://' + req.get('host');
                                        // setup e-mail data with unicode symbols
                                        var mailOptions = {
                                            to: user.email, // list of receivers
                                            subject: "Confirm Account", // Subject line
                                            text: "Confirm Your Account", // plaintext body
                                            html: "<b>For Confirm Your Account</b> <a href=" + fullUrl + "/users/confirm/" + Date.parse(chat_date.date) + "/" + user._id + ">Click Here</a>" // html body
                                        }

                                        // send mail with defined transport object
                                        transporter.sendMail(mailOptions, function (error, response) {
                                            if (error) {} else {}
                                        });
                                        res.status(200).json({
                                            message: 'Your profile has been registered successfully',
                                            data: user,
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            }
        });
    }
};

// User add View
userController.add = function (req, res) {
    var affiliationData = {};
    async function test() {
        await Affiliation.find({
            status: 1
        }).populate("affiliationData").exec(function (err, affiliation) {
            affiliationData = affiliation;
        });
    }
    test().then(() => {
        res.render('../views/users/add', {
            message: '',
            title: 'Y List',
            name: 'Y List',
            affiliation: affiliationData
        });
    });
};

// Edit User Profile 
userController.edit = function (req, res) {
    var affiliationData = {};
    async function test() {
        await Affiliation.find({
            status: 1
        }).populate("affiliationData").exec(function (err, affiliation) {
            affiliationData = affiliation;
        });
    }
    test().then(() => {
        var userId = req.params.id;
        User.findOne({
                '_id': userId
            })
            .populate('yale_affiliation')
            .exec(function (err, users) {
                if (err) {
                    return res.status(400).json({
                        message: 'Error',
                        data: '',
                    });
                } else {
                    res.render('../views/users/edit', {
                        message: '',
                        title: 'Y List',
                        name: 'Y List',
                        affiliation: affiliationData,
                        userData: users,
                        affiliation_id: users.yale_affiliation._id
                    });
                }
            });
    });
};

// Update User
userController.updateUser = function (req, res) {
    var year = moment().diff(req.body.date_of_birth, "years", false);
    if (35 < year) {
        res.status(400).json({
            message: "You must be younger than 35 years",
            data: '',
        });
    } else if (18 > year) {
        res.status(400).json({
            message: "You must be 18 years old or above",
            data: '',
        });
    } else {
        var userData = req.body;
        req.body['user_id'] = req.params.id;
        if (req.body.profile_image != undefined && req.body.profile_image !== '') {
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
                } else {
                }
            });
        } else {
            if (req.params.id) {
                getUser(req.params.id, getUpdateUserCallBack);
            } else {
                res.status(400).json({
                    message: 'userID id required.',
                    data: ''
                });
            }

            function getUpdateUserCallBack(response) {
                if (response.error) {
                    res.status(400).json({
                        message: 'userID id required.',
                        data: ''
                    });
                } else {
                    req.body['profile_image'] = response.data.profile_image;
                    _update(req.params.id, userData, function (response) {
                        res.status(200).json({
                            message: response.message,
                            data: response.data
                        });
                    });
                }
            }
        }
    }
};

function _update(userID, data, callback) {
    User.findByIdAndUpdate(userID, data, (err, entity) => {
        if (err) {
            return callback({
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
userController.profile = function (req, res) {
    res.render('../views/users/editProfile', {
        message: '',
        title: 'Y List',
        name: 'Y List',
    });
};

userController.changePassword = function (req, res) {
    res.render('../views/users/changePassword', {
        message: '',
        title: 'Y List',
        name: 'Y List',
    });
};

userController.list = function (req, res) {
    User.find({
            role_type: 2
        })
        .populate('yale_affiliation')
        .sort({
            created_at: -1
        })
        .exec(function (err, users) {
            if (err) {
                return res.status(400).json({
                    message: 'Error',
                    data: '',
                });
            } else {
                res.render('../views/users/list', {
                    userList: users
                });
            }
        });
};

userController.delete = function (req, res) {
    Matches.find({
        $or: [{
            user_id: req.body.id
        }, {
            partner_id: req.body.id
        }],
    }).exec(function (error, matches) {
        if (matches.length > 0) {
            return res.status(400).json({
                message: 'You cannot delete matched users.',
                data: '',
            });
        } else {
            User.remove({
                _id: req.body.id
            }, function (err, user) {
                if (err) {
                    return res.status(400).json({
                        message: 'Error',
                        data: user,
                    });
                } else {
                    return res.status(200).json({
                        message: 'User has been deleted successfully',
                        data: '',
                    });
                }
            });
        }
    });
};

userController.changeStatus = function (req, res) {
   User.findByIdAndUpdate(req.body.id, {'is_confirmed':req.body.status}, (err, entity) => {
     if (err) {
       return callback({ message: err, data: "" });
     } else {
        return res.status(200).json({
            message: "Status has been updated successfully",
            data: '',
        });
     }
   });     
};

userController.blockUnblockUser = function (req, res) {
   User.findByIdAndUpdate(req.body.id, {'status':req.body.status}, (err, entity) => {
     if (err) {
       return callback({ message: err, data: "" });
     } else {
        return res.status(200).json({
            message: "Status has been updated successfully",
            data: '',
        });
     }
   });     
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
    User.findById({
            _id: userId
        })
        .populate('yale_affiliation')
        .exec(function (err, user) {
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
        });
}

// Check Old password
userController.checkOldPassword = function (req, res) {
    // var pwd = req.params.pwd;
    userId = req.session.user_id;
    User.findById(userId, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            var oldPassword = entity.password;
            var is_pass = passwordHash.verify(req.body.old_password, oldPassword);

            if (is_pass != true) {
                res.status(400).json({
                    message: 'Password is wrong',
                    data: false,
                });
            } else {
                res.status(200).json({
                    message: "Same password",
                    data: true
                });
            }
        }
    });
};

userController.changeUserPassword = function (req, res) {
    if (req.body.new_password === req.body.confirm_password) {
        User.findOne({
            _id: req.session.user_id
        }, function (err, old_user) {
            if (err) {
                res.status(400).json({
                    message: 'user not found',
                    data: '',
                });
            } else {
                var user_password = old_user.password;
                var old_password = req.body.current_password;
                var is_pass = passwordHash.verify(old_password, user_password);
                if (is_pass != true) {
                    res.status(400).json({
                        message: 'Wrong Current Password',
                        data: '',
                    });
                } else {
                    req.body['new_password'] = passwordHash.generate(req.body.new_password);
                    User.findByIdAndUpdate(req.session.user_id, {
                        $set: {
                            password: req.body.new_password
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
                                message: 'Your password changed successfully',
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

userController.detail = function (req, res) {
    var userId = req.params.id || null;
    if (userId) {
        getUser(userId, getUserCallBack);
    } else {
        res.status(400).json({
            message: 'UserID id required.',
            data: ''
        });
    }

    function getUserCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'UserID id required.',
                data: ''
            });
        } else {
            let uid = response.data._id;
            Matches.find({
                    $and: [{
                        $or: [{
                            user_id: uid
                        }, {
                            partner_id: uid
                        }],
                    }, {
                        $or: [{
                            user_like: uid
                        }, {
                            partner_like: uid
                        }]
                    }],
                })
                .populate('user_id')
                .populate('partner_id')
                .exec(function (err, matches) {
                    res.render('../views/users/detail', {
                        message: '',
                        title: 'Y List',
                        name: 'Y List',
                        UserData: response.data,
                        MatchedList: matches
                    });
                })



        }
    }
};

userController.userReport = function (req, res) {
    Reportuser.find()
      .populate("u_id")
      .populate("to_id")
      .sort({ created_at: -1 })
      .exec(function(err, users) {
        if (err) {
          return res.status(400).json({ message: "Error", data: "" });
        } else {
          res.render("../views/users/report", { userList: users });
        }
      });
};

userController.viewReport = function(req, res) {
  Reportuser.findById(req.params.id, (err, viewReport) => {
    if (err) {
      res.status(400).json({ message: err, data: "" });
    } else {
      res.render("../views/users/reportView", {
        viewReport: viewReport
      });
    }
  });
};

userController.deleteReport = function (req, res) {
    Reportuser.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: user,
            });
        } else {
            return res.status(200).json({
                message: 'User Report has been deleted successfully',
                data: '',
            });
        }
    });        
};

module.exports = userController;
