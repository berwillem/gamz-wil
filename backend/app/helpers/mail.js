exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};

exports.emailTamplate = (code) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #e81a2a;text-decoration:none;font-weight:600">Gamz</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing  Gamz. Use the following OTP to complete your Sign Up procedures. OTP is valid for 15 minutes</p>
          <h2 style="background: #e81a2a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
          <p style="font-size:0.9em;">Regards,<br />Gamz</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Gamz</p>
            <p>2023</p>
            <p>Algeria</p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
};
exports.emailTamplate2 = (url) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #e81a2a;text-decoration:none;font-weight:600">Gamz</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>click on the reset button to reset your password the link is valid for 5 minutes</p>
          <a  href=${url} style="background: #e81a2a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Reset</a>
          <p style="font-size:0.9em;">Regards,<br />Gamz</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Gamz</p>
            <p>2023</p>
            <p>Algeria</p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
};
