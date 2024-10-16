import mongoose from "mongoose";
import {gensalt, hash} from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    firstName: {
        type: String,
        required: false,
    },
    latName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next(); // it tells that after all ur code is completed, move on to next part of code otherwise server stops and wont execute further code.
})

const User = mongoose.model("Users", userSchema);

export default User;