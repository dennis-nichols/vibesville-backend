let axios = require("axios");
const { SocketAddress } = require("net");

async function jobsHandler(req, res, next) {
  try {
    // first API call
    let job = req.query.jobQuery;
    let job_url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=10&what=${job}`;
    let job_results = await axios.get(job_url);
    let job_data_send = job_results.data.results.map(
      element => new Job(element)
    );

    // for loop over the job object array to handle multiple calls to city data API
    let job_cities = [];
    for (let job of job_data_send) {

      let get_city_data = async (job) => {
        let city = job.city + ', ' + job.state;

        let city_url = `https://api.teleport.org/api/cities/?search=${city}&limit=1&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`;
        let city_results = await axios.get(city_url);
        let city_object = city_results.data?._embedded["city:search-results"][0]?._embedded[
          "city:item"
        ]?._embedded?.['city:urban_area']?._embedded['ua:scores'];
        return city_object;
      }
      let city_data = await get_city_data(job);
      job_cities.push(city_data);
    }

    // Add city and job data together
    // job_cities.forEach(city => job_data_send.forEach(job => job.cityHandler(city)));
    job_data_send.forEach((job, index) => job.cityHandler(job_cities[index]));

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
    this.CityData = null;
  }
  cityHandler = function (object) {
    this.CityData = object;
  }
}

module.exports = jobsHandler;
