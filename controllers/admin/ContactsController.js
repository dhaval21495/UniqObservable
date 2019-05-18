var mongoose = require("mongoose");
var Contact = require("../../models/Contactus"); 

var contactController = {};

contactController.list = function (req, res) {
    Contact.find({}, function (err, contact) {
        console.log(contact);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: contact,
            });
        } else {
            res.render('../views/settings/contact', { contactList: contact });
        }
    });

};

contactController.delete = function (req, res) {
    Contact.remove({ _id: req.body.id }, function (err, contact) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: contact,
            });
        } else {
            return res.status(200).json({
                message: 'Contact has been deleted successfully',
                data: '',
            });
            // res.render('../views/settings/contact', { contactList: contact });
        }
    });

};

contactController.view = function (req, res) {
    var contactId = req.params.id;
    Contact.findById(contactId, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
             res.render('../views/settings/contactView', {
                message: '',
                title: 'Y List',
                name: 'Y List',
                contactData: entity
            });
        }
    });
};

module.exports = contactController;
