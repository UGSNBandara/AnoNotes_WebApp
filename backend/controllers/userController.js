import { user } from "../models/user.js";
import { request, response } from "express";

//add a new user, a POST method
export const addUser = async (request, response) => {
  try {
    const { username, email, password, massage } = request.body;

    if (!username || !email || !password) {
      return response.status(400).send({
        message: "All fields (username, email, password) are required.",
      });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return response.status(400).send({ message: "Email already in use" });
    }

    const newUser = await user.create({
      username,
      email,
      password,
      massage,
    });

    return response.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    return response.status(500).send({ message: err.message });
  }
};

//get all users a Get Method
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
export const getUserById = async (request, response) => {
    try{
        const userID = request.params.id;
        const sUser = await user.findById(userID);

        if (!sUser){
            return response.status(404).send({message : "user not find"});
        }
        return response.status(200).send(sUser);
    }
    catch(err){
        console.log(err);
        return response.status(500).send({message: err.message});
    }
}

//Update a specific User by Id
export const updateUser = async (request, response) => {
    try{
        const userId = request.params.id;

        const {username, email, password, massage} = request.body;

        if ( !username || !email || !password  ){
            return response.status(400).send({message : "Password email and username field must be fill"});
        }

        const updatedUser = {username, email, password, massage};

        const result = await user.findByIdAndUpdate(userId, updatedUser, {new : true});

        if(!result){
            return response.status(404).send({message : "User Not Found!"});
        }

        return response.status(200).send(result);

    }
    catch(err){
        console.log(err);
        return response.status(500).send({message : err.message});
    }
}