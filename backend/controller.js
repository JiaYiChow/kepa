const service = require("./service");

async function getAllRecordsByUserId(req, res) {
  const records = await service.getAllRecordsByUserId(req.params.userId);

  if (!records) {
    res.sendStatus(404);
  } else {
    res.json({ records });
  }
}

async function createNewRecord(req, res) {
  const record = await service.createNewRecord(req.body);
  if (!record) {
    res.sendStatus(500);
  } else {
    res.json({ record });
  }
}

async function deleteRecord(req, res) {
  service.deleteRecord(req.params.recordId);
  res.sendStatus(204);
}

const controller = { getAllRecordsByUserId, createNewRecord, deleteRecord };
module.exports = controller;