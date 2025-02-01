import mongoose from "mongoose";

const aMassageSchema = mongoose.Schema(
    {
        targetUser : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required: true,
        },
        message : {
            type: String,
            required: true,
        },
        nickname : {
            type : String,
            required : false,
        },
        commenterIP : {
            type : String,
            required : true,
        }
    }
);

export const massages = mongoose.model("Massage", aMassageSchema);