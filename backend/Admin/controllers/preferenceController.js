import { connectDb } from "../../db/db.js";

const getPreferences = async (req, res) => {
  const connection = await connectDb();
  const { q } = req.query.filter ? JSON.parse(req.query.filter) : {};

    let sql = 'SELECT * FROM preferences';
    if (q) {
        sql += ` WHERE user_pref_id LIKE '%${q}%' OR preferred_age_min LIKE '%${q}%' OR preferred_age_max LIKE '%${q}%' OR preferred_gender LIKE '%${q}%'`;
    }

    connection.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.setHeader('Content-Range', `preferences 0-${results.length}/${results.length}`);
        res.json(results);
    });
};

const getPreference = async (req, res) => {
  const connection = await connectDb();
  const { id } = req.params;
  const query = 'SELECT * FROM preferences WHERE user_pref_id = ?';

  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results[0]);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const createPreference = async (req, res) => {
  const connection = await connectDb();
  const { user_pref_id, preferred_age_min, preferred_age_max, preferred_gender } = req.body;
  const query = 'INSERT INTO preferences (user_pref_id, preferred_age_min, preferred_age_max, preferred_gender) VALUES (?, ?, ?, ?)';

  try {
    connection.query(query, [user_pref_id, preferred_age_min, preferred_age_max, preferred_gender], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).json({ ...req.body, user_pref_id: results.insertId });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updatePreference = async (req, res) => {
  const connection = await connectDb();
  const { id } = req.params;
  const { preferred_age_min, preferred_age_max, preferred_gender } = req.body;
  const query = 'UPDATE preferences SET preferred_age_min = ?, preferred_age_max = ?, preferred_gender = ? WHERE user_pref_id = ?';

  try {
    connection.query(query, [preferred_age_min, preferred_age_max, preferred_gender, id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json({ ...req.body, user_pref_id: id });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deletePreference = async (req, res) => {
  const connection = await connectDb();
  const { id } = req.params;
  const query = 'DELETE FROM preferences WHERE user_pref_id = ?';

  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json(results);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { getPreferences, getPreference, createPreference, updatePreference, deletePreference };
