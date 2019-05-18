var mongoose = require("mongoose");
var Hosts = require("../../models/Host");

var HostsController = {};

//Add view
HostsController.add = function (req, res) {
    res.render('../views/hosts/add', {
        message: '',
        title: 'Y List',
        name: 'Y List',
    });
};

// Save Hosts
HostsController.save = function (req, res) {
    var hosts = new Hosts(req.body);
    Hosts.findOne({
        'host_name': req.body.host_name
    }, function (err, affiliation) {
        if (affiliation == null) {
            hosts.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        message: err,
                        data: '',
                    });
                } else {
                    res.status(200).json({
                        message: 'Hosts has been added successfully',
                        data: hosts,
                    });
                }
            });
        } else {
            res.status(400).json({
                message: 'Duplicate host name',
                data: '',
            });
        }
    })
};

// host list
HostsController.list = function (req, res) {
    Hosts.find({}, function (err, hosts) {
        //console.log(hosts);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: hosts,
            });
        } else {
            res.render('../views/hosts/list', {
                hostsList: hosts
            });
        }
    }).sort({
        _id: -1
    });

};

// Edit view
HostsController.edit = function (req, res) {
    var hostId = req.params.id;
    Hosts.findById(hostId, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.render('../views/hosts/edit', {
                message: '',
                title: 'Y List',
                name: 'Y List',
                HostData: entity
            });
        }
    });
};

// update Hosts
HostsController.update = function (req, res) {
    var hostId = req.params.id;
    Hosts.findByIdAndUpdate(hostId, req.body, (err, entity) => {
        console.log(entity);
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.status(200).json({
                message: "Successfully updated",
                data: ''
            });
        }
    });
};

HostsController.delete = function (req, res) {
    Hosts.remove({
        _id: req.body.id
    }, function (err, hosts) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: hosts,
            });
        } else {
            return res.status(200).json({
                message: 'Host deleted successfully',
                data: '',
            });
            // res.render('../views/hosts/list', {
            //     hostsList: hosts
            // });
        }
    });

};



module.exports = HostsController;