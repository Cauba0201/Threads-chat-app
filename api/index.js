const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://threads-chat-app:1@cluster0.rfacter.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("server is running on port 3000");
});

const User = require("./models/user");
const Post = require("./models/post");

// endpoint to register User in the backend

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already registered" });
    }
    // tao user moi

    const newUser = new User({ name, email, password });

    // duyet user
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // luu user vao db
    await newUser.save();

    // gui email verified to nguoi dung
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: " Registration successful" });
  } catch (error) {
    // khi bij loi se tra ve page 500
    console.log("error register", error);
    res.status(500).json({ message: "error register user" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  // create nodemailer transpoter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: {
        user: "nguyenan0201no1@gmail.com",
        password: "hoilamchi1",
      },
    },
  });
  //compose the email message
  const mailOptions = {
    from: "threads.com",
    to: email,
    subject: "email Verifitication",
    text: `please click the following link to verify your email ${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error sending email", error);
  }
};

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    (user.verified = true), (user.verificationToken = undefined);
    await user.save();

    res.status(200).json({ message: "email verified successfully" });
  } catch (error) {
    console.log("error getting token", error);
    res.status(500).json({ message: "email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
