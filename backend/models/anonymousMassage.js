import mongoose from "mongoose";

const aMassageSchema = mongoose.Schema(
    {
        targetUser : {
            type: String,
            required: true,
        },
        massage : {
            type: String,
            required: true,
        },
        nickname : {
            type : String,
            required : false,
        },
    }
);

export const massages = mongoose.model("Massage", aMassageSchema);