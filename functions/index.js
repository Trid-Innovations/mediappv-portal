const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const validSessionResponse = require('./responses/validSessionResponse.json');
const sessionData = require('./responses/sessionData.json');

admin.initializeApp();

const correctCredentials = {
  username: 'aristote.lamine@example.io',
  password: 'Secret1',
};

const app = express();

// Middleware setup
app.use(
  cors({
    origin: 'https://local.mediappv.tech:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to create a session
app.post('/create-session', (req, res) => {
  const { username, password } = req.body;

  if (username === correctCredentials.username && password === correctCredentials.password) {
    res.status(200).json({
      sessionToken: 'validMediappvSessionJWT',
    });
  } else {
    res.status(200).json({
      error: {
        code: 'INVALID_SESSION',
        message: 'The given JWT token has an invalid signature',
      },
    });
  }
});

// Route to validate a session
app.post('/validate-session', (req, res) => {
  console.log('Cookies:', req.cookies);
  const cookieToken = req?.cookies?.MEDIAPPV_SESSION_TOKEN;
  debugger;
  const authHeader = req.get('Authorization');
  const token = cookieToken || (authHeader && authHeader.split(' ')[1]);

  if (token === 'validMediappvSessionJWT') {
    res.status(200).json(validSessionResponse);
  } else {
    res.status(200).json({
      error: {
        code: 'INVALID_SESSION',
        message: 'The given JWT token has an invalid signature',
      },
    });
  }
});

// Route to get session data
app.get('/session', (req, res) => {
  console.log('Cookies:', req.cookies);
  const cookieToken = req?.cookies?.MEDIAPPV_SESSION_TOKEN;
  console.log({ cookieToken });
  // res.status(200).json(sessionData);
  if (cookieToken === 'validMediappvSessionJWT') {
    res.status(200).json(sessionData);
  } else {
    res.status(200).json({
      error: {
        code: 'INVALID_SESSION',
        message: 'The given JWT token has an invalid signature',
      },
    });
  }
});

// Route to logout session
app.post('/logout', (req, res) => {
  res.cookie('MEDIAPPV_SESSION_TOKEN', '', {
    expires: new Date(0), // Set expiration to a past date to remove the cookie
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/',
    domain: '.mediappv.tech',
  });

  res.status(200).json({
    message: 'Session has been successfully logged out.',
  });
});

// Route to authorize and capture payment
app.post('/authorize-and-capture', (req, res) => {
  const cookieToken = req.cookies.MEDIAPPV_SESSION_TOKEN;

  // Validate session token
  if (cookieToken !== 'validMediappvSessionJWT') {
    return res.status(401).json({
      error: {
        code: 'INVALID_SESSION',
        message: 'The given JWT token has an invalid signature',
      },
    });
  }

  // Extract payment details from request body
  const paymentDetails = req.body;

  // Validate the required fields in paymentDetails
  if (!paymentDetails || !paymentDetails.providerId || !paymentDetails.article || !paymentDetails.cost) {
    return res.status(400).json({
      error: {
        code: 'INVALID_PAYLOAD',
        message: 'The payment details provided are invalid or incomplete',
      },
    });
  }

  // Check if the user has enough credits
  const userCredits = sessionData.settings.credits;
  const creditsCost = paymentDetails.article.creditsCost;

  if (userCredits < creditsCost) {
    return res.status(403).json({
      error: {
        code: 'INSUFFICIENT_CREDITS',
        message: 'User does not have enough credits to complete this purchase',
      },
    });
  }

  // Deduct the credits from the user's account
  sessionData.settings.credits -= creditsCost;

  // Return a successful response
  return res.status(200).json({
    message: 'Payment authorized and credits deducted successfully',
    remainingCredits: sessionData.settings.credits,
  });
});

// Export the Express app wrapped in Firebase Functions
exports.api = functions.https.onRequest(app);
