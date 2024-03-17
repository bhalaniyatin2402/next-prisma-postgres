import nodemailer from 'nodemailer';

export async function sendMail(email: string, subject: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 2525,
    auth: {
      user: "kano24022@gmail.com",
      pass: "sybcblddenlwztfw",
    }
  })  

  const Options = {
    from: "kano24022@gmail.com",
    to: email,
    subject,
    html: message
  }

  await transporter.sendMail(Options, (err, info) => {
    if (err) {
      console.log(err);
    }
  })
}
