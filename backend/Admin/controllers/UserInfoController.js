import { connectDb, queryAsync } from '../../db/db.js';

const getManyUserInfo = async (req, res) => {
  const connection = connectDb();

  try {
    const { filter, sort, range } = req.query;
    const { q } = filter ? JSON.parse(filter) : {};
    const sortParams = sort ? JSON.parse(sort) : ['user_info_id', 'ASC'];
    const rangeParams = range ? JSON.parse(range) : [0, 25];
    let [sortField, sortOrder] = sortParams;
    const [rangeStart, rangeEnd] = rangeParams;

    let sql = 'SELECT * FROM userInfo';
    const params = [];

    if (q) {
      sql += ` WHERE user_info_id LIKE ? OR firstname LIKE ? OR lastname LIKE ? OR profile_picture LIKE ? OR gender LIKE ? OR birthdate LIKE ? OR Sub_District LIKE ? OR District LIKE ? OR City LIKE ? OR Country LIKE ? OR Postcode LIKE ? OR bio LIKE ?`;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (sortField === 'id') sortField = 'user_info_id';
    sql += ` ORDER BY ${sortField} ${sortOrder}`;
    sql += ` LIMIT ?, ?`;
    params.push(rangeStart, rangeEnd - rangeStart + 1);

    const results = await queryAsync(connection, sql, params);
    const countResults = await queryAsync(connection, 'SELECT COUNT(*) AS total FROM userInfo');

    const total = countResults[0].total;
    res.setHeader('Content-Range', `userInfo ${rangeStart}-${rangeStart + results.length - 1}/${total}`);
    res.json(results);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.end();
  }
};

const getUserInfo = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;

  try {
    const results = await queryAsync(connection, 'SELECT * FROM userInfo WHERE user_info_id = ?', [id]);
    res.json(results[0]);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const createUserInfo = async (req, res) => {
  const connection = connectDb();
  const { user_info_id, firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio } = req.body;
  const query = 'INSERT INTO userInfo (user_info_id, firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const results = await queryAsync(connection, query, [user_info_id, firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio]);
    res.status(201).json({ ...req.body, user_info_id: results.insertId });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const updateUserInfo = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;
  const { firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio } = req.body;
  const query = 'UPDATE userInfo SET firstname = ?, lastname = ?, profile_picture = ?, gender = ?, birthdate = ?, Sub_District = ?, District = ?, City = ?, Country = ?, Postcode = ?, bio = ? WHERE user_info_id = ?';

  try {
    await queryAsync(connection, query, [firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio, id]);
    res.status(200).json({ ...req.body, user_info_id: id });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const deleteUserInfo = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;
  const query = 'DELETE FROM userInfo WHERE user_info_id = ?';

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

const deleteManyUserInfo = async (req, res) => {
  const connection = connectDb();
  const { ids } = req.body;
  const query = 'DELETE FROM userInfo WHERE user_info_id IN (?)';

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

export { getManyUserInfo, getUserInfo, createUserInfo, updateUserInfo, deleteUserInfo, deleteManyUserInfo };
