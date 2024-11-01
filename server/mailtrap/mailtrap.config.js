import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAIL_TRAP_TOKEN;
// const ENDPOINT = process.env.MAIL_TRAP_ENDPOINT;

export const client = new MailtrapClient({
 
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Muhammad Furqan",
};
// const recipients = [
//   {
//     email: "furqan.b2002@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
