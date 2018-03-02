const mongoose = require("./connection");
mongoose.Promise = global.Promise;
var User = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
//        unique: true
    },
    phoneNo: {
        type: Number
    }
});
var UserSchema = mongoose.model("users", User);

module.exports = UserSchema;
