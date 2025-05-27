const accountActivatedNotification = ({ name, url, email }) => {
  return {
    from: `"SPORTIFY " <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Account Activated login now!", // Subject line
    text: `Hello ${name}`, // plain text body
    html: `<span>Hello </span>
<strong>${name},</strong>
<br/>
<br/>

<p>Congratulations! Your account has been successfully activated. You may now log in by clicking the login button below.</p>

<br/>

<a href = ${url}>
<button style="background-color:green; color:white; font-size:20px; font-weight:500; padding:4px; border:none;border-radius:5px;">Log In</button>
</a>
<br/>
<br/>

<p>Best regards</p>
<br></br>
<br></br>
<p>SPORTIY management</p>`, // html body
  };
};

export default accountActivatedNotification;
