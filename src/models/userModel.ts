import mongoose from "mongoose";

const userSchema: any = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Must provide username"],
        unique: [true, "Username should be unieque"]
    }
    ,
    password: {
        type: String,
        required: [true, "Must provide password"]
    }
})

const User  =  mongoose.model("User",userSchema);

export default User;