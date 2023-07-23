const dataAccess = require("./data-access");

async function getAllRecordsByUserId(userId) {
  try {
    const records = await dataAccess.getAllRecordsByUserId(userId);
    return records;
  } catch (error) {
    return null;
  }
}

async function createNewRecord(record) {
  try {
    //create a new record
    const result = await dataAccess.createNewRecord(record);
    return result;
  } catch (error) {
    console.error("Exception at service.js: " + error);
    return null;
  }
}

async function deleteRecord(recordId) {
  try {
    dataAccess.deleteRecord(recordId);
  } catch (error) {
    console.error("Exception at service.js: " + error);
    return null;
  }
}

const service = {
  getAllRecordsByUserId,
  createNewRecord,
  deleteRecord,
};

module.exports = service;
