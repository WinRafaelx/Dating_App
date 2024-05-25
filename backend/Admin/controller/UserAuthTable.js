import { connectDb } from "../../db/db.js";

const getUsers = async (req, res) => {
  const connection = await connectDb();

  try {
    connection.query("SELECT * FROM userAuth", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { getUsers };