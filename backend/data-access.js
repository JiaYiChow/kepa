const pool = require("./db/db");

async function createNewRecord(record) {
  try {
    const client = await pool.connect();
    const query =
      'INSERT INTO "Record" (userId, recordTitle, audioFile) VALUES ($1, $2, $3) RETURNING *';
    const values = [record.userId, record.recordTitle, record.audioFile];

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      throw new Error("No rows returned after INSERT operation.");
    }
    console.log("New record inserted successfully");
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting new record:", error);
  }
}

async function getAllRecordsByUserId(userId) {
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM "Record" WHERE userId = $1';
    const values = [userId];

    const result = await client.query(query, values);
    client.release();

    return result.rows;
  } catch (error) {
    console.error("Error querying the database:", error);
    return null;
  }
}

async function deleteRecord(recordId) {
  try {
    const client = await pool.connect();
    const query = 'DELETE FROM "Record" WHERE recordId = $1';
    const values = [recordId];

    const result = await client.query(query, values);
    client.release();

    return result.rows;
  } catch (error) {
    console.error("Error querying the database:", error);
    return null;
  }
}

const dataAccess = { createNewRecord, getAllRecordsByUserId, deleteRecord };
module.exports = dataAccess;
