const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

const path=require('path')
const roomHandler = require("./src/room");
const connectDB = require("./config/db");
const isLoggedIn = require('./middlewares/IsLogged');
const logger = require('./helpers/logger'); // Import your custom logger
const CustomError = require('./helpers/CustomError'); // Import your custom logger


dotenv.config();
const port = process.env.PORT || 5003;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
// Connect to the MongoDB database



// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// USER
app.use('/user', require('./routes/userRoutes'));
//PROFILE
app.use('/profile',  require('./routes/profile/profileRoutes'));
app.use('/follower', require('./routes/profile/followerRoutes'));
app.use('/following', require('./routes/profile/followingRoutes'));
app.use('/post',      require('./routes/profile/postRoutes'));

// CHAT
app.use("/message", require('./routes/messages'));
app.use("/conversation",require('./routes/conversation.js'))
//PAYMENTS
app.use('/pay', require('./routes/paymentRoutes'));






// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Passport.js initialization
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5003/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Custom middleware to check if a user is authenticated
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

// After login
const secretKey = process.env.ACCESS_TOKEN_SECRET; 
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

let users = [];

io.on("connection", (socket) => {
 
  const token = socket.handshake.query.token;

  

  if (!token) {
    socket.disconnect(true);
    return;
  }

  const decodedToken = jwt.verify(token, secretKey);

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  roomHandler(socket);

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User disconnected");
  });
});

//throw new CustomError(400, 'Custom error message');

// Global Error Handler
app.use((err, req, res, next) => {
  // Log the error using your custom logger


  if (err instanceof CustomError) {
    // Handle custom errors with the specified status code and message
    res.status(err.statusCode).json({ error: err.message });
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    res.status(400).json({ error: err.message });
  } else if (err.name === 'UnauthorizedError') {
    // Authentication error (e.g., invalid token)
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    // Handle other types of errors (e.g., database errors, unexpected errors)
    res.status(500).json({ error: 'Something went wrong' });
  }
});


server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
