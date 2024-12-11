const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port:587,
            secure:false,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: '"Test" habibakhatoon287@gmail.com',
            to: "recipient@example.com",       
            subject: "Test Email",       
            text: "This is a test email.",
            // from: '"YourApp" <' + process.env.EMAIL_USER + '>',
            // to,
            // subject,
            // text,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendEmail;