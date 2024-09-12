
const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
// Use CORS middleware
app.use(cors());

app.post('/', (req, res) => {
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user:"lesmwendwa@gmail.com",
          pass: "hsln dpvl ockt fhgm",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: `Portfolio mailing account: <lesmwendwa@gmail.com>`, // my address 
          to: "lesmwendwa@gmail.com", // list of receivers
          cc: `Senders account:${req.body.email}`, //we will cc sender here
          subject: req.body.subject, // Subject line
          text: req.body.message, // plain text body
          html: `<b>I am contacting you from your portfolio.My name is ${req.body.name}.  My email is ${req.body.email}. ${req.body.message}. <br></br>This message was delivered from my portfolio contact form.</b>`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
       
      }
      
      main().catch(console.error);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});