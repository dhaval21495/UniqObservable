var mongoose = require("mongoose");
var Blogs = require("../../models/Blog");


var blogsController = {};


blogsController.list = function (req, res) {
    Blogs.find({}, function (err, blogs) {
        console.log(blogs);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: blogs,
            });
        } else {
            res.render('../views/blogs/list', { BlogList: blogs });
        }
    }).sort({ _id: -1 });

};

blogsController.add = function (req, res) {
    res.render('../views/blogs/add', {
        message: '',
        title: 'Y List',
        name: 'Y List',
    });
};

blogsController.edit = function (req, res) {
    var blogId = req.params.id;
    Blogs.findById(blogId, (err, entity) => {
        console.log(entity);
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.render('../views/blogs/edit', {
                message: '',
                title: 'Y List',
                name: 'Y List',
                BlogData: entity
            });
        }
    });
};

blogsController.delete = function (req, res) {
    Blogs.remove({ _id: req.body.id }, function (err, blogs) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: blogs,
            });
        } else {
            return res.status(200).json({
                message: 'Blog has been deleted successfully',
                data: blogs,
            });
        }
    });

};

// Save Blog
blogsController.save = function (req, res) {
    var blogs = new Blogs(req.body);
    blogs.save(function (err) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: 'Blog has been added successfully',
                data: blogs,
            });
        }
    });
};

// update Blog
blogsController.update = function (req, res) {
    var blogId = req.params.id;
    Blogs.findByIdAndUpdate(blogId, req.body, (err, entity) => {
        console.log(entity);
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.status(200).json({
                message: "Blog has been updated successfully",
                data: ''
            });
        }
    });
};

module.exports = blogsController;
