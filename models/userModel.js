import mongoose from "mongoose"

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username is already taken"]
    },
    password: {
        type: String,
        required: [true,"password is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    isverified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPassword:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model('users', UserModel);

export default User;