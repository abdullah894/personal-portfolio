const express = require("express");


const mainPage = (req,res) => {
res.render('mainPage');
};

const nodemailer = require('nodemailer');

const userequest = async (req, res) => {
    try {
        const { name, email, subject, comment } = req.body;

        // Use nodemailer to send an email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abdullahlatif243@gmail.com', // Use your Gmail account here
                pass: 'epty gmsp qdoj yniz', // Replace with your Gmail account password
            },
        });

        const mailOptions = {
            from: email, // Use the user's email as the "from" address
            to: 'abdullahlatif243@gmail.com',
            subject: subject || 'No Subject',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${comment}`,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};







module.exports = {
    mainPage,
    userequest
};