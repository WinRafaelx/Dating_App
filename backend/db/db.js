import bcrypt from 'bcrypt';
import { connectDb, queryAsync } from './dbConfig.js';

// Function to create tables
async function createTables(connection) {
  try {
    // userAuth Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS userAuth (
                user_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    // preferences Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS preferences (
                user_pref_id VARCHAR(36) PRIMARY KEY,
                preferred_age_min INT NOT NULL,
                preferred_age_max INT NOT NULL,
                preferred_gender VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_pref_id) REFERENCES userAuth(user_id)
            )
        `);

    // userInfo Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS userInfo (
                user_info_id VARCHAR(36) PRIMARY KEY,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                profile_picture VARCHAR(255) NOT NULL,
                gender VARCHAR(255) NOT NULL,
                birthdate DATE NOT NULL,
                Sub_District VARCHAR(255),
                District VARCHAR(255),
                City VARCHAR(255),
                Country VARCHAR(255) NOT NULL,
                Postcode VARCHAR(255) NOT NULL,
                bio TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_info_id) REFERENCES userAuth(user_id)
            )
        `);

    // likes Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS likes (
                like_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                Liker_ID VARCHAR(36) NOT NULL,
                Liked_ID VARCHAR(36) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (Liker_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (Liked_ID) REFERENCES userAuth(user_id)
            )
        `);

    // matches Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS matches (
                match_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                Matcher_ID VARCHAR(36) NOT NULL,
                Matched_ID VARCHAR(36) NOT NULL,
                Matched_Status VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (Matcher_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (Matched_ID) REFERENCES userAuth(user_id)
            )
        `);

    // chats Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS chats (
                chat_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                User1_ID VARCHAR(36) NOT NULL,
                User2_ID VARCHAR(36) NOT NULL,
                Chat_Status VARCHAR(255) NOT NULL DEFAULT 'Active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (User1_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (User2_ID) REFERENCES userAuth(user_id)
            )
        `);

    // messages Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS messages (
                message_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                Chat_ID VARCHAR(36) NOT NULL,
                Sender_ID VARCHAR(36) NOT NULL,
                Receiver_ID VARCHAR(36) NOT NULL,
                Message TEXT NOT NULL,
                isRead BOOLEAN NOT NULL DEFAULT FALSE,
                isRead_time TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (Chat_ID) REFERENCES chats(chat_id),
                FOREIGN KEY (Sender_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (Receiver_ID) REFERENCES userAuth(user_id)
            )
        `);

    // reports Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS reports (
                report_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                Reporter_ID VARCHAR(36) NOT NULL,
                Reported_ID VARCHAR(36) NOT NULL,
                Report_Type VARCHAR(255) NOT NULL,
                Report_Description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (Reporter_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (Reported_ID) REFERENCES userAuth(user_id)
            )
        `);

    // block Table with UUID as primary key
    await queryAsync(connection, `
            CREATE TABLE IF NOT EXISTS blocks (
                block_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                Blocker_ID VARCHAR(36) NOT NULL,
                Blocked_ID VARCHAR(36) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (Blocker_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (Blocked_ID) REFERENCES userAuth(user_id)
            )
        `);

    // Check if default admin and data analyst users exist
    const adminRows = await queryAsync(
      connection,
      `SELECT * FROM userAuth WHERE username = 'admin'`
    );
    const analystRows = await queryAsync(
      connection,
      `SELECT * FROM userAuth WHERE username = 'data_analyst'`
    );

    if (adminRows.length === 0) {
      const adminPassword = await bcrypt.hash("adminpassword", 10);
      await queryAsync(connection, `
          INSERT INTO userAuth (user_id, username, email, password, role)
          VALUES 
              (UUID(), 'admin', 'admin@example.com', '${adminPassword}', 'admin')
      `);
    }

    if (analystRows.length === 0) {
      const analystPassword = await bcrypt.hash("analystpassword", 10);
      await queryAsync(connection, `
          INSERT INTO userAuth (user_id, username, email, password, role)
          VALUES 
              (UUID(), 'data_analyst', 'data_analyst@example.com', '${analystPassword}', 'data-analyst')
      `);
    }

  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// Function to initiate connect to MySQL
async function initialDB() {
  try {
    const connection = await connectDb();
    console.log("Connected to MySQL");

    // Create tables
    await createTables(connection);

    // Close connection
    await connection.end();
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
}

initialDB();

export { connectDb, initialDB };
