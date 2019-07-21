var mongoose = require("mongoose");
var CodeTypeMaster = require("../models/CodeTypeMaster");
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var codeTypeMasterController = {};

codeTypeMasterController.save = function (req, res) {
    var test = new CodeTypeMaster(req.body);
    test.save(function (err, testData) {
        if (err) {
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Code type master inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all code type master
codeTypeMasterController.list = function (req, res) {
    CodeTypeMaster.find({}, function (err, data) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'Code type Master Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};

// get Code type Master By ID
codeTypeMasterController.getCodeTypeMasterByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getCodeTypeMaster(id, getCodeTypeMasterCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getCodeTypeMasterCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Code type master id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'code type Master Data.',
                data: response.data
            });
        }
    }
};

function getCodeTypeMaster(id, callback) {
    CodeTypeMaster.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "code type master not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}

// update code type master
codeTypeMasterController.update = function (req, res) {
    var id = req.params.id;
    CodeTypeMaster.findByIdAndUpdate(id, req.body, (err, codetypemaster) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: codetypemaster
            });
        } else {
            res.status(200).json({
                message: "code type master has been updated successfully..",
                data: codetypemaster
            });
        }
    });
};

// delete code type master
codeTypeMasterController.delete = function (req, res) {
    CodeTypeMaster.remove({ _id: req.params.id }, function (err, codetypemaster) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: codetypemaster,
            });
        } else {
            return res.status(200).json({
                message: 'code type master has been deleted successfully',
                data: codetypemaster,
            });
        }
    });

};

module.exports = codeTypeMasterController;