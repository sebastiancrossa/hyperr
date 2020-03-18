const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const createEmail = text => `
    <div className="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px">
        <h2>Hyperrr</h2>
        <h3>Here is the link to reset your password</h3>

        <p>${text}</p>
        
        <p>Sebastian Crossa</p>
    </div>
`;

exports.transport = transport;
exports.createEmail = createEmail;
