const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        uniqe: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone:{
        type: String,
        required: true,
    },
    roles:{
        type:String,
        enum:['manager','cilent'],
        default:'cilent'
    },
    active:{
        type:Boolean,
        default:true
    }    

}, { timestamps: true })
module.exports = mongoose.model("User", userSchema)