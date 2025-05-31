const PharmacyRequest = require("../models/PharmacyRequest");

exports.createRequest = async (req, res) => {
  try {
    const request = new PharmacyRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await PharmacyRequest.find().populate("requestedBy medicines.medicine");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const updated = await PharmacyRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
