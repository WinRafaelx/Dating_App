import { connectDb, queryAsync } from '../../db/db.js';


const getUsers = async (req, res) => {
  const connection = connectDb();

  try {
    const { filter, sort, range } = req.query;
    const { q } = filter ? JSON.parse(filter) : {};
    const sortParams = sort ? JSON.parse(sort) : ['user_id', 'ASC'];
    const rangeParams = range ? JSON.parse(range) : [0, 25];
    let [sortField, sortOrder] = sortParams;
    const [rangeStart, rangeEnd] = rangeParams;

    let sql = 'SELECT * FROM userAuth';
    const params = [];

    if (q) {
      sql += ` WHERE user_id LIKE ? OR username LIKE ? OR email LIKE ? OR role LIKE ?`;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (sortField === 'id') sortField = 'user_id';
    sql += ` ORDER BY ${sortField} ${sortOrder}`;
    sql += ` LIMIT ?, ?`;
    params.push(rangeStart, rangeEnd - rangeStart + 1);

    const results = await queryAsync(connection, sql, params);
    const countResults = await queryAsync(connection, 'SELECT COUNT(*) AS total FROM userAuth');

    const total = countResults[0].total;
    res.setHeader('Content-Range', `userAuth ${rangeStart}-${rangeStart + results.length - 1}/${total}`);
    res.json(results);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.end();
  }
};

const getUser = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;

  try {
    const results = await queryAsync(connection, 'SELECT * FROM userAuth WHERE user_id = ?', [id]);
    res.json(results[0]);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const createUser = async (req, res) => {
  const connection = connectDb();
  const { username, email, password, role } = req.body;
  const query = 'INSERT INTO userAuth (username, email, password, role) VALUES (?, ?, ?, ?)';

  try {
    const results = await queryAsync(connection, query, [username, email, password, role]);
    res.status(201).json({ ...req.body, user_id: results.insertId });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const updateUser = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;
  const { username, email, password, role } = req.body;
  const query = 'UPDATE userAuth SET username = ?, email = ?, password = ?, role = ? WHERE user_id = ?';

  try {
    await queryAsync(connection, query, [username, email, password, role, id]);
    res.status(200).json({ ...req.body, user_id: id });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const deleteUser = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;
  const query = 'DELETE FROM userAuth WHERE user_id = ?';

  try {
    await queryAsync(connection, query, [id]);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const getMany = async (req, res) => {
  const connection = connectDb();
  const { filter } = req.query;
  const ids = JSON.parse(filter).id;
  const query = 'SELECT * FROM userAuth WHERE user_id IN (?)';

  try {
    const results = await queryAsync(connection, query, [ids]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const deleteMany = async (req, res) => {
  const connection = connectDb();
  const { ids } = req.body;
  const query = 'DELETE FROM userAuth WHERE user_id IN (?)';

  try {
    await queryAsync(connection, query, [ids]);
    res.status(200).send('Deleted successfully');
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser, getMany, deleteMany };
