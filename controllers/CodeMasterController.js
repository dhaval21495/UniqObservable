var mongoose = require("mongoose");
var CodeMaster = require("../models/CodeMaster");
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var codeMasterController = {};

codeMasterController.save = function (req, res) {
    var test = new CodeMaster(req.body);
    test.save(function (err, testData) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Code master inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all code master
codeMasterController.list = function (req, res) {
    CodeMaster.find({}, function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'Code Master Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get Code Master By ID
codeMasterController.getCodeMasterByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getCodeMaster(id, getCodeMasterCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getCodeMasterCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Code master id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'code Master Data.',
                data: response.data
            });
        }
    }
};
function getCodeMaster(id, callback) {
    CodeMaster.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "code master not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}

// update code mster
codeMasterController.update = function (req, res) {
    var id = req.params.id;
    CodeMaster.findByIdAndUpdate(id, req.body, (err, codemaster) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: codemaster
            });
        } else {
            res.status(200).json({
                message: "code master has been updated successfully..",
                data: codemaster
            });
        }
    });
};
// delete code master
codeMasterController.delete = function (req, res) {
    CodeMaster.remove({ _id: req.params.id }, function (err, codemaster) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: codemaster,
            });
        } else {
            return res.status(200).json({
                message: 'code master has been deleted successfully',
                data: codemaster,
            });
        }
    });

};

module.exports = codeMasterController;