import mysql from "mysql2/promise";
import config from "./../config";

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
  });
  return connection;
};

export const dbMethods = {
  getConnection,
};

async function testConnection() {
  try {
    const connection = await getConnection();
    console.log("Database connection successful!");
    connection.release();
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

// Call the test function during application startup (e.g., in index.js)
testConnection();
