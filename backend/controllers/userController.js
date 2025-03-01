import { user } from "../models/user.js";
import { request, response } from "express";
import { hashPassword, verifyPassword } from "../utils/passwordsUtils.js";

//add a new user, a POST method
export const addUser = async (request, response) => {
  try {
    const { username, email, password, massage } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({
        success : false,
        message: "All fields (username, email, password) are required.",
      });
    }

    const hashedPassword = hashPassword(password);

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return response.status(400).json({success : false, message: "Email already in use" });
    }

    const newUser = await user.create({
      username,
      email,
      password: hashPassword,
      massage,
    });

    return response.status(201).json({success : true, user : newUser});
  } catch (err) {
    console.error(err);
    return response.status(500).json({success : false, message: err.message });
  }
};

//get all users a Get Method
//Not will use in frontend : just testing perposes
export const getUsers = async (request, response) => {
  try {
    const users = await user.find();
    return response.status(200).send(users);
  } catch (err) {
    console.error(err);
    return response.status(500).send({ message: err.message });
  }
};

//get a specific user by the ID 
//Not will use in frontend : just testing perposes
export const getUserById = async (request, response) => {
  try {
    const userID = request.params.id;
    const sUser = await user.findById(userID);

    if (!sUser) {
      return response.status(404).send({ message: "user not find" });
    }
    return response.status(200).send(sUser);
  }
  catch (err) {
    console.log(err);
    return response.status(500).send({ message: err.message });
  }
}

//Update a specific User by Id
//Not will use in frontend : just testing perposes
export const updateUser = async (request, response) => {
  try {
    const userId = request.params.id;

    const { username, email, password, massage } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({success: false, message: "Password email and username field must be fill" });
    }

    const updatedUser = { username, email, password, massage };

    const result = await user.findByIdAndUpdate(userId, updatedUser, { new: true });

    if (!result) {
      return response.status(404).json({success : false,  message: "User Not Found!" });
    }

    return response.status(200).json({success : true, user : result});

  }
  catch (err) {
    console.log(err);
    return response.status(500).json({success : false,  message: err.message });
  }
}

export const login = async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({success : false, message: "Username or Password must be Filled" });
    }

    const data = user.findOne({ username });

    if (!data) {
      return response.status(404).json({success : false,  message: "User is not Found" });
    }

    if (verifyPassword(password, data.password)) {
      return response.status(200).json({success : true, user : data});
    }

  }

  catch (err) {
    return response.status(500).json({success : true,  message: err.message });
  }
}