/**
 * Created by anuraagbasu on 28/04/16.
 */

var config = require("./config/environment");

module.exports = function (app) {

    app.use('/v1/car', require('./api/car'));

    app.use('/v1/user', require('./api/user'));

    app.use('/v1/ride', require('./api/ride'));

    app.route("/|(:url(user|car|ride)/*)")
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/pages/index.html');
        });
};