import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

async function connectDb() {
  // set connection to mongodb
  await mongoose
    .connect("mongodb://127.0.0.1:27017/Dating-App")
    .then(() => console.log("Connected to MongoDB"));
}

const registerSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const preferenceSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    preferred_age_min: Number,
    preferred_age_max: Number,
    preferred_gender: String,
  },
  { timestamps: true }
);

const infoFormSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
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
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema(
  {
    Liker_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    Liked_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
  },
  { timestamps: true }
);

const matchSchema = new mongoose.Schema(
  {
    Matcher_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    Matched_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    Matched_Status: String,
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    Chat_ID: { type: ObjectId, primary: true },
    User1_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    User2_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
  },
  { timestamps: true }
);

const messageSchema = new mongoose.Schema(
  {
    Chat_ID: { type: ObjectId, ref: 'Chat'},
    Sender_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    Receiver_ID: { type: ObjectId, ref: 'Register' }, // Foreign key referencing Register model
    Message: String,
    isRead: Boolean,
    isRead_time: Date,
  },
  { timestamps: true }
);

const registerModel = mongoose.model("Register", registerSchema);
const preferenceModel = mongoose.model("Preferences", preferenceSchema);
const infoFormModel = mongoose.model("UserInfoes", infoFormSchema);
const likeModel = mongoose.model("Likes", likeSchema);
const matchModel = mongoose.model("Matches", matchSchema);
const chatModel = mongoose.model("Chats", chatSchema);
const messageModel = mongoose.model("Messages", messageSchema);

export {
  connectDb,
  preferenceModel,
  infoFormModel,
  registerModel,
  likeModel,
  matchModel,
  chatModel,
  messageModel
};
