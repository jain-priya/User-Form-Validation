var userSchema = require("./schema");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'notify.users1@gmail.com',
        pass: 'NotifyUsers1'
    }
});


const UserOperations = {

    saveForm: function (userObject, response) {

        var userSchObject = new userSchema({
            name: userObject.name,
            dob: userObject.dob,
            email: userObject.email,
            phoneNo: userObject.phone
        });
        console.log("Inside Form Saver");
        userSchObject.save(function (err, result) {
            console.log("Inside save function.....")
            if (err) {
                console.log(err);
                response.send("CannotSave")

            } else {
                console.log(result);
                console.log("Trying to send Mail");
                var mailOptions = {
                    from: 'notify.users1@gmail.com',
                    to: userObject.email,
                    subject: 'Form Submission Confirmation',
                    text: 'Dear ' + userObject.name + ', Your form has been submitted'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Error during sending MAil: " + error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                response.send('Saved');
            }
        });
    }
}
module.exports = UserOperations;
