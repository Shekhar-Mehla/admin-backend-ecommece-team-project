import nodemailer from "nodemailer";

const nodeMailer = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_Email,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  return transporter;
};

export default nodeMailer;
