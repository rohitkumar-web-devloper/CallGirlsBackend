import nodemailer from "nodemailer";
const SendMail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'lorenzo.stanton24@ethereal.email',
      pass: 'AhQRp82qG4TT6BwJDV'
    }
  });
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <rohitkumar952895@gmail.com>',
    to: "rohitkumar952895@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
  console.log(info, '------');
}

export default SendMail