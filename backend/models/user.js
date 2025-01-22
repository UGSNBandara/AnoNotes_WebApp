import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        massage : {
            type : String,
            required : false,
            default : "No massage provided",
        },
    }
)

export const user = mongoose.model("User", userSchema);