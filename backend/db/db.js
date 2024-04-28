import mongoose from "mongoose";

async function connectDb() {
  // set connection to mongodb
  await mongoose
    .connect("mongodb://127.0.0.1:27017/Dating-App")
    .then(() => console.log("Connected to MongoDB"));
}

const userSchema = new mongoose.Schema({
    user_id: Number,
    username: String,
    email: String,
    password: String,
    profile_picture: String,
    gender: String,
    birthdate: Date,
    Sub_District: String,
    District: String,
    City: String,
    bio: String
})

const preferenceSchema = new mongoose.Schema({
    user_id: Number,
    preferred_age_min: Number,
    preferred_age_max: Number,
    preferred_gender: String,
  });

const userModel = mongoose.model("Users", userSchema);

export { connectDb, userModel };
