import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

async function connectDb() {
  // set connection to mongodb
  await mongoose
    .connect("mongodb://127.0.0.1:27017/Dating-App")
    .then(() => console.log("Connected to MongoDB"));
}

const registerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

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

const likeSchema = new mongoose.Schema(
  {
    Liker_ID: ObjectId,
    Liked_ID: ObjectId,
  },
  { timestamps: true }
);

const matchSchema = new mongoose.Schema(
  {
    Matcher_ID: ObjectId,
    Matched_ID: ObjectId,
    Matched_Status: String,
  },
  { timestamps: true }
);

const registerModel = mongoose.model("Register", registerSchema);
const preferenceModel = mongoose.model("Preferences", preferenceSchema);
const infoFormModel = mongoose.model("UserInfoes", infoFormSchema);
const likeModel = mongoose.model("Likes", likeSchema);
const matchModel = mongoose.model("Matches", matchSchema);

export { connectDb, preferenceModel, infoFormModel, registerModel, likeModel, matchModel };
