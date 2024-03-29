/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback',
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

const register = async (req, res) => {
  const {
    email, name, phone, password,
  } = req.body;
  if (!email || !name || !password || !phone) {
    res.status(400).json({
      status: 'fail',
      message: 'please enter according to the instructions',
    });
    return res;
  }
  const isEmailUsed = await User.findOne({ email });
  if (isEmailUsed) {
    res.status(400).json({
      status: 'fail',
      message: 'Email is already in use',
    });
    return res;
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = new User({
    email,
    name,
    phone,
    password: passwordHash,
  });
  await newUser.save();
  res.status(201).json({
    status: 'success',
    message: 'registration was successful',
  });
  return res;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'please enter according to the instructions',
    });
    return res;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      status: 'fail',
      message: 'email not registered',
    });
    return res;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({
      status: 'fail',
      message: 'Wrong Password',
    });
    return res;
  }
  // data yang disecure
  const data = {
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    // token aktif 1 days / 1hari
    expiresIn: '1d',
  });
  res.status(200).json({
    status: 'success',
    message: 'login successful',
    token,
  });
  return res;
};

// Google Login
const googleLogin = (req, res) => {
  try {
    res.redirect(authorizationUrl);
  } catch (err) {
    console.log('ini error pada', err.message);
  }
};

// Google Callback
const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid code',
      });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const { data: dataUser } = await oauth2.userinfo.get();

    if (!dataUser.email || !dataUser.name) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete user data',
        dataUser,
      });
    }

    let user = await User.findOne({ email: dataUser.email });
    if (!user) {
      user = await User.create({
        name: dataUser.name,
        email: dataUser.email,
      });
    }

    // biasanya redirectkan ke frontend karena tidak ada frontendnya maka menggunakan json
    // return res.redirect(`http://localhost:3000/auth-success?token=${token}`);

    const data = {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: 'success',
      message: 'login successful',
      token,
    });
  } catch (error) {
    console.error('Error in googleCallback:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
  return res;
};

module.exports = {
  register,
  login,
  googleLogin,
  googleCallback,
};
