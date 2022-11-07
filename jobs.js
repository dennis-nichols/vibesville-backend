let axios = require("axios");

async function jobsHandler(req, res, next) {
  try {
    let job = req.query.jobQuery;
    let job_url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=10&what=${job}`;
    let job_results = await axios.get(job_url);
    res.status(200).send(job_results.data.results);
  } catch (error) {
    next(error);
  }
}

module.exports = jobsHandler;