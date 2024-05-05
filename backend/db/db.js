import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

async function connectDb() {
  // set connection to mongodb
  await mongoose
    .connect("mongodb://127.0.0.1:27017/Dating-App")
    .then(() => console.log("Connected to MongoDB"));
}

const preferenceSchema = new mongoose.Schema({
  _id: ObjectId,
  preferred_age_min: Number,
  preferred_age_max: Number,
  preferred_gender: String,
});

const infoFormSchema = new mongoose.Schema({
  _id: ObjectId,
  firstname: String,
  lastname: String,
  profile_picture: String,
  gender: String,
  birthdate: Date,
  Sub_District: String,
  District: String,
  City: String,
  Country: String,
  Postcode: String,
  bio: String,
});

const preferenceModel = mongoose.model("Preferences", preferenceSchema);
const infoFormModel = mongoose.model("UserInfoes", infoFormSchema);

export { connectDb, preferenceModel, infoFormModel };
