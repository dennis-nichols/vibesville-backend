let axios = require("axios");

async function jobsHandler(req, res, next) {
  try {
    let job = req.query.jobQuery;
    let job_url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=10&what=${job}`;
    let job_results = await axios.get(job_url);
    let job_data_send = job_results.data.results.map(
      element => new Job(element)
    );
    res.status(200).send(job_data_send);
  } catch (error) {
    next(error);
  }
}

class Job {
  constructor(object) {
    this.title = object.title;
    this.company = object.company.display_name;
    this.description = object.description;
    this.redirect_url = object.redirect_url;
    this.city = object.location.area[3];
    this.state = object.location.area[1];
    this.latitude = object.latitude;
    this.longitude = object.longitude;

  }
}

module.exports = jobsHandler;