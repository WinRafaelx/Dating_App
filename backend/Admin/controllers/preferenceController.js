import { connectDb } from "../../db/db.js";

const getPreferences = async (req, res) => {
  const connection = await connectDb();
  const { _sort = 'user_pref_id', _order = 'DESC', _start = 0, _end = 10 } = req.query;
  const start = parseInt(_start);
  const end = parseInt(_end);
  const limit = end - start;

  // List valid columns for sorting
  const validSortFields = ['user_pref_id', 'preferred_age_min', 'preferred_age_max', 'preferred_gender', 'created_at', 'updated_at'];
  const sortField = validSortFields.includes(_sort) ? _sort : 'user_pref_id';

  const query = `
    SELECT * FROM preferences
    ORDER BY ?? ${_order === 'ASC' ? 'ASC' : 'DESC'}
    LIMIT ?, ?
  `;

  try {
    connection.query(query, [sortField, start, limit], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        connection.query(
          'SELECT COUNT(*) AS count FROM preferences',
          (err, countResults) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.setHeader('X-Total-Count', countResults[0].count);
              res.status(200).json(results);
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
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
