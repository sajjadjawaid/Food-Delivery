import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesnt Exists",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials ",
      });
    }
    const token = creatToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("error in loginUser", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

//token
const creatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//signup
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //to check if the user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    //checking email validation
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter Valid Email",
      });
    }

    //to check strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password length must be greater then or Equal to 8 digits",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //now creating user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = creatToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("error in register user", error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

export { loginUser, registerUser };
