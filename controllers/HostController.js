var mongoose = require("mongoose");
var Host = require("../models/Host");
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "the.y.list2018@gmail.com",
        pass: "ruirui2018"
    }
},
    {
        from: 'Yale University <the.y.list2018@gmail.com>',

    }
);
var hostController = {};

hostController.list = function (req, res) {
    Host.find({ status: true }).exec(function (err, host) {
        if (err) {
            res.status(400).json({
                message: 'host not found',
                data: '',
            });
        }
        else {
            res.status(200).json({
                message: 'host list',
                data: host,
            });
        }
    });
};

hostController.mail = function (req, res) {

    console.log("HERE");
    var mailOptions = {
        to: "testingkeyur@gmail.com", // list of receivers
        subject: "Confirm Account from new server last message", // Subject line
        text: "Confirm Your Account", // plaintext body
        html: "Test message " // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            //return process.exit(1);

        } else {
            console.log('Message sent successfully to your email!');

        }
    });


};

module.exports = hostController;