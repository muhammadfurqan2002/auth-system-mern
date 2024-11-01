import { client, sender } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "92a25da3-6a6d-4ed7-8329-147b2a0d24ad",
      template_variables: {
        name: name,
        company_info_name: "Butt Eats",
      },
    });
    console.log("email send successfully", res);
  } catch (error) {
    console.log(error.toString());
    throw new Error("Error sending welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    throw new Error("Error sending password reset email", error.message);
  }
};



export const sendResetSuccessEmail=async(email)=>{
  const recipient=[{email}]
  try{
    const res=await client.send({
      from:sender,
      to:recipient,
      subject:"Password Reset Successful",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE,
      category:"Password Reset"
    })
    console.log(res);
  }catch(error){
    throw new Error("Error sending password reset success email",error.message)
  }
}