const jwt = require("jsonwebtoken");
const { sendError, creatRandomBytes } = require("../helpers/error");
const User = require("../models/User");
const VerificationToken = require("../models/verifToken");
const ResetToken = require("../models/resetPassword");
const { isValidObjectId } = require("mongoose");
const {
  generateOTP,
  emailTamplate,
  emailTamplate2,
} = require("../helpers/mail");
require('dotenv').config()
const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.API_KEY;




// register ::::::
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  //   register validation :
  const user = await User.findOne({ email });
  if (user) return sendError(res, "this email already exsist!");

  const usernamee = await User.findOne({ username });
  if (usernamee) return sendError(res, "this username already exsist!");

  // creating

  const newUser = new User({
    username,
    email,
    password,
  });

  const OTP = generateOTP();
  const verificationToken = new VerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await verificationToken.save();
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

     "sender":{ "email":"wbdz19@gmail.com", "name":"willem"},
     "subject":"Verify your email account",
     "htmlContent":emailTamplate(OTP),
    
     "to":[
      {
         "email":newUser.email,
      },]
  

}).then(function(data) {
  console.log(data);
}, function(error) {
  console.error(error);
});
  await newUser.save();
  res.send(newUser);
};

// login ::::

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim())
    return sendError(res, "email/password is messing!");
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found Register?");
  const Matched = await user.comparePassword(password);
  if (!Matched) return sendError(res, "wrong email or password!");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  
  res.json({
    success: true,
    user: { username: user.username, email: user.email, id: user._id, token ,infoUpdate:user.infoUpdate,avatar:user.avatar,banner:user.banner},
  });
};

// verify email :::

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim())
    return sendError(res, "Invalid request , missing parameters!");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user id");

  const user = await User.findById(userId);

  if (!user) return returnsendError(res, "User not found!");

  if (user.verified) return sendError(res, "this acount is already verified");
  const token = await VerificationToken.findOne({ owner: user._id });

  if (!token) return sendError(res, "User not found!");

  const Match = await token.compareToken(otp);

  if (!Match) return sendError(res, "please provide a valid code");
  user.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();
  res.json({
    success: true,
    message: "your email is verified",
    user: { username: user.username, email: user.email, id: user._id },
  });
};

// forgot password :::
exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "please provide a valid email!");
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "user not found");
  const token = await ResetToken.findOne({ owner: user._id });
  if (token) return sendError(res, "token expired in 10 minutes");

  const randomBytes = await creatRandomBytes();
  const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
  await resetToken.save();
  const url = `http://127.0.0.1:5173/PassForgot2?token=${randomBytes}&id=${user._id}`;
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

    "sender":{ "email":"wbdz19@gmail.com", "name":"willem"},
    "subject":"passwordreset",
    "htmlContent":emailTamplate2(url),
   
    "to":[
     {
        "email":user.email,
     },]
 

    }).then(data => {
      console.log(data);
      }).catch(error => {
      console.error(error);
      });
      res.json({
        success: true,
        message: "Password reset link is sent To your email.",
      });    
};

// reset password :::
exports.resetpassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return sendError(res, "user not found");
  const isSame = await user.comparePassword(password);
  if (isSame) return sendError(res, "New password Must be different");
  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, "password must be 8 to 20 caracters");
    user.password = password.trim()
    await user.save()
    await ResetToken.findOneAndDelete({owner: user._id});
    res.json({
      success: true,
      message: "Password updated",
    });

};
