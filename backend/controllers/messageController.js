import {  massages } from "../models/anonymousMassage.js";
import { request, response } from "express";

export const addMessage = async (request, response) => {
    try{
        const {targetUser, message , nickname, commenterIP } = request.body;

        if(!targetUser || !message || !commenterIP ){
            return response.status(400).send({
                message: "Some Required Data has missing",
            });
        }

        const newmessage = await massage.create({
            targetUser,
            message,
            nickname,
            nickname,
            commenterIP,
        })

        return response.status(201).send(newmessage);

    }
    catch(err){
        console.log(err);
        return response.status(500).send({message: err.message });
    }
}


//to get the all messages
export const getAllMessages = async (request, response) => {
    try {
        const allMessages = await massages.find();

        return response.status(200).send(allMessages);
    }
    catch(err){
        console.log(err);
        return response.status(500).send({message: err.message});
    }
}

//to get messages relevent to user
export const getMessgesByUser = async (request, response) => {
    try{
        const targetUser = request.params.id;
        const messagesByUser = await massages.find({targetUser: targetUser});
        
        return response.status(200).send(messagesByUser);
    }
    catch(err){
        console.log(err);
        return response.status(500).send({message: err.message});
    }
}
