var mongoose = require("mongoose");
var Matches = require("../models/Matches");

var matchesController = {};

// matchesLike
matchesController.matchesLike = function (req, res) {
    getMatches(req.body.user_id, req.body.partner_id, getMatchesCallBack);

    function getMatchesCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Something went wrong.',
                data: ''
            });
        } else {
            if (response.data.length > 0) {
                if (response.data[0].user_id == req.body.user_id) {
                    var user_id = {
                        "user_like": (req.body.type == 'like') ? req.body.user_id : "",
                        "user_like_date": new Date(),
                    };
                    _update(response.data[0]._id, user_id, function (update_response) {
                        res.status(200).json({
                            message: update_response.message,
                            data: update_response.data
                        });
                    });
                } 
                if (response.data[0].partner_id == req.body.user_id) {
                    var user_id = {
                        "partner_like": (req.body.type == 'like') ? req.body.user_id : "",
                        "partner_like_date": new Date(),
                    };
                    _update(response.data[0]._id, user_id, function (update_response) {
                        res.status(200).json({
                            message: update_response.message,
                            data: update_response.data
                        });
                    });
                }
            } else {
                const matchesData = {
                    user_id: req.body.user_id,
                    partner_id: req.body.partner_id,
                    user_like: req.body.user_id,
                    user_like_date: new Date(),
                    partner_like: "",
                    partner_like_date: "",
                };
                var matches = new Matches(matchesData);
                matches.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            message: err,
                            data: '',
                        });
                    } else {
                        res.status(200).json({
                            message: "Liked successfully",
                            data: '',
                        });
                    }
                });
            }
        }
    }
};
//

// matchesDisLike
matchesController.matchesDisLike = function (req, res) {
    getMatches(req.body.user_id, req.body.partner_id, getDisLikeCallBack);
    function getDisLikeCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Somthing went wrong.',
                data: ''
            });
        } else {
            if (response.data.length > 0) {
                if (response.data[0].user_id == req.body.user_id) {
                    var user_id = {
                        "user_like": '',
                        "user_like_date": new Date(),
                    };
                    _update(response.data[0]._id, user_id, function (update_response) {
                        res.status(200).json({
                            message: update_response.message,
                            data: update_response.data
                        });
                    });
                }
                if (response.data[0].partner_id == req.body.user_id) {
                    var user_id = {
                        "partner_like": '',
                        "partner_like_date": new Date(),
                    };
                    _update(response.data[0]._id, user_id, function (update_response) {
                        res.status(200).json({
                            message: update_response.message,
                            data: update_response.data
                        });
                    });
                }
            }
        }
    }
};
//

// Matches _update
function _update(id, data, callback) {
    Matches.findByIdAndUpdate(id, data, (err, entity) => {
        console.log(entity);
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            return callback({
                message: "successfully",
                data: ''
            });
        }
    });
}
//

// getMatches callback
function getMatches(user_id, partner_id, callback) {
    Matches.find({
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
            return callback({
                error: false,
                data: results
            });
        } else {
            return callback({
                error: false,
                data: results
            });
        }
    });
}
module.exports = matchesController;