import nodemailer from 'nodemailer';

export async function sendMail(email: string, subject: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
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
      throw new Error()
    }
  })
}