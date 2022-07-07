const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  venderService,
  tokenService,
  emailService
} = require('../services');

const register = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let vender;
  try {
    vender = await venderService.createVender({
      
      ...req.body,
      name : req.body.firstName+" "+req.body.lastName
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
 
  // user = await user.populate("_org", "name email");

  const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    vender,
    token,
    expires
  });
});
const google = catchAsync(async (req, res) => {
  // const org = await userService.createOrg(req.body);
  let vender;
  try {
    vender = await venderService.createGoogleVender({
      
      ...req.body,
      name : req.body.firstName+" "+req.body.lastName,
      isEmailVerified:true,
    });
  } catch (e) {
    // await org.remove();
    throw e;
  }
 
  // user = await user.populate("_org", "name email");

  const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    vender,
    token,
    expires
  });
});
const login = catchAsync(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const vender = await authService.loginUserWithEmailAndPassword(email, password);
  const {
    token,
    expires
  } = await tokenService.generateAuthTokens(user);
  res.send({
    vender,
    token,
    expires
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const self = catchAsync(async (req, res) => {
  res.send(req.vender);
});

module.exports = {
  register,
  google,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  self
};