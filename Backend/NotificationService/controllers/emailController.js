const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res, next) => {
  const { to, subject, description } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    html: `
    <html>
      <head>
        <style>
          /* Styles for the banner image */
          .banner {
            width: '100%';
            height:20
            maxWidth: '600px';
            height: 'auto';
          }

          /* Styles for the email body */
          .email-body {
            background-color: '#f2f2f2';
            fontFamily: 'Arial, sans-serif';
            fontSize: '16px';
            lineHeight: 1.5;
            margin: 0;
            padding: 0;
          }

          /* Styles for the content container */
          .content-container {
            backgroundolor: '#ffffff';
            margin: 0 auto;
            maxWidth: '600px';
            padding: '20px';
          }

          /* Styles for the heading */
          .heading {
            fo
            marginBottom: '20px';
          }

          /* Styles for the paragraph */
          .paragraph {
            marginBottom: '20px';
          }
        </style>
      </head>
      <body class="email-body">
        <img class="banner" src="https://a.ipricegroup.com/media/Hayley_/iherb_malaysia.jpg" alt="Banner Image">
        <div class="content-container">
          <h1 class="heading"><center>${subject}</center></h1>
          <p>==============================================================================================================================================</p>
          <p class="paragraph">${description}</p>
          <h1 class="heading"><center>Thank You!</center></h1>
        </div>
      </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      if (error.responseCode == 535) {
        return res.status(401).json({
          message: "Authentication Failed!",
        });
      } else {
        return res.status(500).json(error);
      }
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Mail Successfully Sent!" });
    }
  });
};

module.exports = sendMail;
