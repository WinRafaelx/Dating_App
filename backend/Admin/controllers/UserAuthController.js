import { connectDb } from "../../db/db.js";


const getUsers = async (req, res) => {
  const connection = await connectDb();
  const { q } = req.query.filter ? JSON.parse(req.query.filter) : {};

    let sql = 'SELECT * FROM userAuth';
    if (q) {
        sql += ` WHERE user_id LIKE '%${q}%' OR username LIKE '%${q}%' OR email LIKE '%${q}%' OR role LIKE '%${q}%'`;
    }

    connection.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.setHeader('Content-Range', `userAuth 0-${results.length}/${results.length}`);
        res.json(results);
    });
};

const getUser = async (req, res) => {
  const connection = await connectDb();
  const { id } = req.params;
  const query = 'SELECT * FROM userAuth WHERE user_id = ?';
  connection.query(query, [id], (error, results) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(results[0]);
      }
  });
};

const createUser = async (req, res) => {
  const connection = await connectDb();
  const { username, email, password, role } = req.body;
  const query = 'INSERT INTO userAuth (username, email, password, role) VALUES (?, ?, ?, ?)';

  try {
    connection.query(query, [username, email, password, role], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).json({ ...req.body, user_id: results.insertId });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  const connection = await connectDb();
  const { id } = req.params;
  const { username, email, password, role } = req.body;
  const query = 'UPDATE userAuth SET username = ?, email = ?, password = ?, role = ? WHERE user_id = ?';

  try {
    connection.query(query, [username, email, password, role, id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json({ ...req.body, user_id: id });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const connection = await connectDb();
  const { id } = req.params;
  const query = 'DELETE FROM userAuth WHERE user_id = ?';

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

const getMany = async (req, res) => {
  const connection = await connectDb();
  const { filter } = req.query;
  const ids = JSON.parse(filter).id;
  const query = 'SELECT * FROM userAuth WHERE user_id IN (?)';

  try {
    connection.query(query, [ids], (error, results) => {
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

const deleteMany = async (req, res) => {
  const connection = await connectDb();
  const { ids } = req.body;
  const query = 'DELETE FROM userAuth WHERE user_id IN (?)';

  try {
    connection.query(query, [ids], (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send("Deleted successfully");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser, getMany, deleteMany };