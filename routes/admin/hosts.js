var hosts = require('../../controllers/admin/HostsController.js');

module.exports = function (app) {
    // Get host
    app.get('/admin/hosts/list', function (req, res) {
        console.log("sghdah");
        hosts.list(req, res);
    });

    // Edit host
    app.get('/admin/hosts/edit/:id', function (req, res) {
        hosts.edit(req, res);
    });

    // delete host
    app.post('/admin/hosts/delete/', function (req, res) {
        hosts.delete(req, res);
    });

    // GET update host
    app.post('/admin/hosts/update/:id', function (req, res) {
        hosts.update(req, res);
    });

    // Save hosts
    app.post('/admin/hosts/save', function (req, res) {
        hosts.save(req, res);
    });

    // add new hosts
    app.get('/admin/hosts/add', function (req, res) {
        hosts.add(req, res);
    });
}