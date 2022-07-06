import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e003d76f836e87",
    pass: "746a3b4e819624"
  }
});


export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({ subject, body }: SendMailData){
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gilbert Kemell <kemegil515@gmail.com>',
      subject,
      html: body
    })
  }
}