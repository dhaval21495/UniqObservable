module.exports = function checkAdminLogin(req, res, next) {
    var c = new Date();
    var dateString = '';
    dateString = new Date().toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ');
    console.log("Date.parse(new Date()) >>>>>>>>>>>>>>>>>> ");
    console.log(Date.parse(new Date()));
    if (req.session.email != null) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}