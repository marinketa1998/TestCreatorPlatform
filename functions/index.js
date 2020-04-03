const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '********@gmail.com',
        pass: '************'
    }
});

exports.sendContactMessage = functions.firestore.document('/Codes/{code}').onCreate(snap,context => {
    //const snapshot = event.data;
  // Only send email for new messages.
    if (snap.previous.val() || !snap.val().email) {
      return;
    }
    
    
    const mailOptions = {
        from:`noreply@testcreatordatabase.firebaseapp.com`,
        to: snap.data().email,
        subject: 'contact form message',
        html: `<h1>Order Confirmation</h1>
         <p> <b>Email: </b>${snap.data().email} </p>`
    };

    return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            console.log(error)
            return
        }
        console.log("Sent!")
    })
  });