import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const registerModel = mongoose.model("Register", registerSchema);

export { registerModel,registerSchema };