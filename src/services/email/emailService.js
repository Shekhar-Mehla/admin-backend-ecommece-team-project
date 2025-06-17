import nodeMailer from "../../config/nodeMailer.js";
import accountActivationLinkTemplate from "./emailTemplates.js/activationLink.js";

export const accountActivationLinkEmail = async ({ name, email, url }) => {
  const transporter = nodeMailer();
  const mail = await transporter.sendMail(
    accountActivationLinkTemplate({ name, url, email })
  );
  return mail;
};
