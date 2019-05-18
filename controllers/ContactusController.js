var mongoose = require("mongoose");
var Contactus = require("../models/Contactus");
const main_ids = require('../config/email_id');
const nodemailer = require('nodemailer');

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

var contactController = {};

contactController.send = function (req, res) {
    var contactus = new Contactus(req.body);
    contactus.save(function (err, contact) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            //
            fullUrl = req.protocol + '://' + req.get('host');
            // setup e-mail data with unicode symbols
            var mailOptions = {
               
                to: main_ids.from_email, // list of receivers
                subject: "Contact us", // Subject line
                text: "", // plaintext body
                html: contact.name + " is contact to you" // html body
            }

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log("Email error");
                    console.log(error);
                } else {
                    console.log("==== Email ====");
                    console.log("Email sent");
                    console.log("==== Email ====");
                }
            });
            //
            res.status(200).json({
                // message: "Your Message has been successfully sent. We will contact back you shortly.",
                message: "Message has been sent successfully",
                data: '',
            });
        }
    });
};

module.exports = contactController;
