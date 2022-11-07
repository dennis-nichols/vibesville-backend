let axios = require("axios");
const Job = require("./models/job.js");

// CREATE
async function postJobs(request, response, next) {
  try {
    let createdJob = await Job.create(request.body);
    response.status(201).send(createdJob);
  } catch (error) {
    next(error);
  }
}

// READ
async function getSavedJobs(request, response, next) {
  try {
    let user = request.params.user_id;
    const jobs = await Job.find({ user_id: user });
    response.status(200).send(jobs);
  } catch (error) {
    next(error);
  }
}

// UPDATE
async function updateJob(req, res, next) {
  try {
    const id = req.params.job_id;
    const data = req.body;
    const updatedJob = await Job.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(200).send(updatedJob)
  } catch (error) {
    next(error);
  }
}

// DELETE

async function deleteJob(request, response, next) {
  try {
    let id = request.params.job_id;
    await Job.findByIdAndDelete(id);
    response.status(204).send("Job deleted.");
  } catch (error) {
    next(error);
  }
}

module.exports = {postJobs, getSavedJobs, updateJob, deleteJob};