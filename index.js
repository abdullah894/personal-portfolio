const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const router = require('./src/routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Existing routes
app.use('/', router);

// Email submission route
app.post('/submit-form', (req, res) => {
    const { name, email, subject, comment } = req.body;

    // Use nodemailer to send an email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'destination-email@example.com',
        subject: subject || 'No Subject',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${comment}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email Sent Successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
