import jwt from "jsonwebtoken";
import { preferenceModel, infoFormModel } from "../../db/db.js";

// Calculate the age function from birthdate
const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const matching = async (req, res) => {
  const { addressType } = req.body;

  const token = req.cookies.token_auth;
  if (!token) {
    console.log("Token not found");
    return res.sendStatus(401);
  }

  let decodedToken = jwt.decode(token);
  if (!decodedToken) {
    console.log("Invalid token");
    return res.sendStatus(401);
  }

  try {
    // Find the user's preferences
    const preferences = await preferenceModel.findOne({
      _id: decodedToken._id,
    });

    const userInfo = await infoFormModel.findOne({ _id: decodedToken._id });

    if (!preferences) {
      console.log("User preferences not found");
      return res.status(404).send("User preferences not found");
    }

    console.log(userInfo);

    // Define the query criteria based on the addressType
    let query = { _id: { $ne: decodedToken._id }, gender: preferences.preferred_gender };
    if (addressType.toLowerCase() === 'sub_district') {
      query = {
        ...query,
        $and: [
          { City: userInfo.City },
          { District: userInfo.District },
          { Sub_District: userInfo.Sub_District }
        ]
      };
    } else {
      query = { ...query, City: userInfo.City };
    }

    // Find all users except the current user based on the query criteria
    const allUsers = await infoFormModel.find(query).lean();
    console.log(allUsers);

    // Filter users based on preferences
    const userInPreference = allUsers.filter((user) => {
      const userAge = calculateAge(user.birthdate);
      return (
        userAge >= preferences.preferred_age_min &&
        userAge <= preferences.preferred_age_max &&
        user[addressType] == userInfo[addressType]
      );
    });

    // Return the filtered users
    res.status(200).json(userInPreference);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { matching };
