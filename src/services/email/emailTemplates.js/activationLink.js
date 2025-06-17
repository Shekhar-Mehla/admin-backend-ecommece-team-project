export const accountActivationLinkTemplate = ({ name, email, url }) => {
  return {
    from: `"SPORTIFY " <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Action-required click on the link to activate the account", // Subject line
    text: `Hello ${name}`, // plain text body
    html: `<span>Hello </span>
<strong>${name},</strong>
<br/>
<br/>

<p>please click on the button below to activate your account</p>
<br/>

<a href = ${url}>
<button style="background-color:green; color:white; font-size:20px; font-weight:500; padding:4px; border:none;border-radius:5px;">Activate Now</button>
</a>
<br/>
<br/>

<p>Best regards</p>
<br></br>
<br></br>
<p>SPORTIY management</p>`, // html body
  };
};

export default accountActivationLinkTemplate;
