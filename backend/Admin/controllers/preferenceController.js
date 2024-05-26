import { connectDb, queryAsync } from '../../db/db.js';

const getPreferences = async (req, res) => {
  const connection = connectDb();

  try {
    const { filter, sort, range } = req.query;
    const { q } = filter ? JSON.parse(filter) : {};
    const sortParams = sort ? JSON.parse(sort) : ['user_pref_id', 'ASC'];
    const rangeParams = range ? JSON.parse(range) : [0, 25];
    let [sortField, sortOrder] = sortParams;
    const [rangeStart, rangeEnd] = rangeParams;

    let sql = 'SELECT * FROM preferences';
    const params = [];

    if (q) {
      sql += ` WHERE user_pref_id LIKE ? OR preferred_age_min LIKE ? OR preferred_age_max LIKE ? OR preferred_gender LIKE ?`;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (sortField === 'id') sortField = 'user_pref_id';
    sql += ` ORDER BY ${sortField} ${sortOrder}`;
    sql += ` LIMIT ?, ?`;
    params.push(rangeStart, rangeEnd - rangeStart + 1);

    const results = await queryAsync(connection, sql, params);
    const countResults = await queryAsync(connection, 'SELECT COUNT(*) AS total FROM preferences');

    const total = countResults[0].total;
    res.setHeader('Content-Range', `preferences ${rangeStart}-${rangeStart + results.length - 1}/${total}`);
    res.json(results);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.end();
  }
};

const getPreference = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;

  try {
    const results = await queryAsync(connection, 'SELECT * FROM preferences WHERE user_pref_id = ?', [id]);
    res.json(results[0]);
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const createPreference = async (req, res) => {
  const connection = connectDb();
  const { user_pref_id, preferred_age_min, preferred_age_max, preferred_gender } = req.body;
  const query = 'INSERT INTO preferences (user_pref_id, preferred_age_min, preferred_age_max, preferred_gender) VALUES (?, ?, ?, ?)';

  try {
    const results = await queryAsync(connection, query, [user_pref_id, preferred_age_min, preferred_age_max, preferred_gender]);
    res.status(201).json({ ...req.body, user_pref_id: results.insertId });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const updatePreference = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;
  const { preferred_age_min, preferred_age_max, preferred_gender } = req.body;
  const query = 'UPDATE preferences SET preferred_age_min = ?, preferred_age_max = ?, preferred_gender = ? WHERE user_pref_id = ?';

  try {
    await queryAsync(connection, query, [preferred_age_min, preferred_age_max, preferred_gender, id]);
    res.status(200).json({ ...req.body, user_pref_id: id });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    connection.end();
  }
};

const deletePreference = async (req, res) => {
  const connection = connectDb();
  const { id } = req.params;
  const query = 'DELETE FROM preferences WHERE user_pref_id = ?';

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

const getManyPreferences = async (req, res) => {
  const connection = connectDb();
  const { filter } = req.query;
  const ids = JSON.parse(filter).id;
  const query = 'SELECT * FROM preferences WHERE user_pref_id IN (?)';

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

const deleteManyPreferences = async (req, res) => {
  const connection = connectDb();
  const { ids } = req.body;
  const query = 'DELETE FROM preferences WHERE user_pref_id IN (?)';

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

export { getPreferences, getPreference, createPreference, updatePreference, deletePreference, getManyPreferences, deleteManyPreferences };
