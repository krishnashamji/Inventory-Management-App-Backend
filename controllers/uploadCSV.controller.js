import uploadCSVService from "../service/uploadCSV.service.js";

export async function uploadCSV(req, res) {
  try {
    await uploadCSVService.uploadCSV(req);
    res.status(201).send({ message: "CSV data uploaded successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
