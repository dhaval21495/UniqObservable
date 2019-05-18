var mongoose = require("mongoose");
var Blog = require("../models/Blog");

var cmsController = {};

cmsController.list = function (req, res) {
    var perPage = 8;
    var page = req.query.page || 1;
    Blog.find({status:true})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({
            created_at: -1
        })
        .exec(function (err, blog) {
            Blog.count().exec(function (err, count) {
                res.status(200).json({
                    message: 'Blog List',
                    data: blog,
                    page: Math.ceil(count / perPage),
                    current: page,
                });
            })
        })
}
module.exports = cmsController;