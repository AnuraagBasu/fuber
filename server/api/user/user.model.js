/**
 * Created by anuraagbasu on 30/04/16.
 */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    phone: {type: Number, unique: true}
});

module.exports = mongoose.model("User", UserSchema);