const dataAccess = require("./data-access");

async function getAllRecordsByUserId(userId) {
  try {
    if (!userId) {
      const errorMessage = "Missing or invalid userId";
      const errorResponse = { error: errorMessage };
      throw { status: 400, response: errorResponse };
    }

    let output = [];
    let records = await dataAccess.getAllRecordsByUserId(userId);

    for (let i = 0; i < records.length; i += 1) {
      const { audiofile } = records[i];
      const base64AudioFile = Buffer.from(audiofile).toString("base64");
      output = [...output, { ...records[i], audiofile: base64AudioFile }];
    }
    return output;
  } catch (error) {
    console.log("Error at service.js: " + error);
    return null;
  }
}

async function createNewRecord(userId, recordTitle, audioFileBuffer) {
  try {
    //TODO handle the error where the audio file is empty
    //TODO process audio file buffer?
    if (!userId) {
      const errorMessage = "Missing or invalid userId";
      const errorResponse = { error: errorMessage };
      throw { status: 400, response: errorResponse };
    }
    const result = await dataAccess.createNewRecord(
      userId,
      recordTitle,
      audioFileBuffer
    );
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
