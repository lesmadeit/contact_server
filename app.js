
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
          pass: "gbhh dpbg odgd jvjm",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: req.body.email, // sender address
          to: "lesmwendwa@gmail.com", // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.message, // plain text body
          html: `<b>${req.body.message}. This message was delivered from my portfolio contact form.</b>`, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
       
      }
      
      main().catch(console.error);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});