import mysql from 'mysql';

// Function to initiate connect to MySQL
async function initialDB() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'Dating_App'
        });
        console.log("Connected to MySQL");

        // Create tables
        await createTables(connection);

        // Close connection
        await connection.end();
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
    }
}

// Function to connect to MySQL
async function connectDb() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Dating_App'
    });
}

// Function to create tables
async function createTables(connection) {
    try {
        // userAuth Table with UUID as primary key
        await connection.query(`
            CREATE TABLE IF NOT EXISTS userAuth (
                user_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // preferences Table with UUID as primary key
        await connection.query(`
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
        await connection.query(`
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
                Country VARCHAR(255),
                Postcode VARCHAR(255),
                bio TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_info_id) REFERENCES userAuth(user_id)
            )
        `);

        // likes Table with UUID as primary key
        await connection.query(`
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
        await connection.query(`
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
        await connection.query(`
            CREATE TABLE IF NOT EXISTS chats (
                chat_id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
                User1_ID VARCHAR(36) NOT NULL,
                User2_ID VARCHAR(36) NOT NULL,
                Chat_Status VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (User1_ID) REFERENCES userAuth(user_id),
                FOREIGN KEY (User2_ID) REFERENCES userAuth(user_id)
            )
        `);

        // messages Table with UUID as primary key
        await connection.query(`
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

        console.log("Tables created successfully");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

export { connectDb, initialDB };
