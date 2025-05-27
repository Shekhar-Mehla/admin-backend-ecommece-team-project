import nodeMailer from "../../config/nodeMailer.js";
import accountActivatedNotification from "./emailTemplates.js/accountActivatedNotification.js";
import accountActivationLinkTemplate from "./emailTemplates.js/activationLink.js";

export const accountActivationLinkEmail = async ({ name, email, url }) => {
  const transporter = nodeMailer();
  const mail = await transporter.sendMail(
    accountActivationLinkTemplate({ name, url, email })
  );
  return mail;
};
export const accountActivatedNotificationEmail = async ({ name, email, url }) => {
  const transporter = nodeMailer();
  const mail = await transporter.sendMail(
    accountActivatedNotification({ name, url, email })
  );
  return mail;
};
