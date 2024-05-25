import mysql from 'mysql';

export const queryAsync = (connection, sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

export const connectDb = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Dating_App",
  });
};
