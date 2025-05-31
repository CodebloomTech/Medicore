// controllers/scheduleController.js
const Schedule = require("../models/Schedule");

exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("doctor");
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate("doctor");
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const deleted = await Schedule.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Schedule not found" });
    res.status(200).json({ message: "Schedule deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
