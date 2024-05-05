import jwt from "jsonwebtoken";
import { likeModel, matchModel } from "../../db/db.js";

const likeForm = async (req, res) => {
    const { liked_user_id } = req.body;
    const token = req.cookies.token_auth;
    let decodedToken = null;

    if (!token) {
        console.log("Token not found");
        res.sendStatus(401);
        return; // Return to exit the function
    } else {
        decodedToken = jwt.decode(token);
    }

    try {
        let like = await likeModel.findOne({ Liker_ID: decodedToken._id, Liked_ID: liked_user_id });

        if (like) {
            // If like exists, delete it
            await like.delete();
            res.status(200).send("Like removed");
        } else {
            // If like does not exist, create new like
            const newLike = new likeModel({
                Liker_ID: decodedToken._id,
                Liked_ID: liked_user_id
            });
            await newLike.save();

            // Csheck if the liked user has liked the current user
            let check_match = await likeModel.findOne({ Liker_ID: liked_user_id, Liked_ID: decodedToken._id });
            if (check_match) {
                // If liked exists, create a new match
                const newMatch = new matchModel({
                    Matcher_ID: liked_user_id,
                    Matched_ID: decodedToken._id,
                    Matched_Status: "Matched"
                });
                await newMatch.save();
                res.status(201).send("Match created");
            } else {
                res.status(201).send("Like created");
            }
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export { likeForm };