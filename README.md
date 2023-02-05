# Vibesville Backend

A REST API for the VibesVille job search and life optimization tool.

## How it works

- This API makes requests to the [Adzuna API](https://developer.adzuna.com/overview) based on the job query received from the React frontend.
- For each job returned from Adzuna, the job city is extracted and another request for that city is sent to the [Teleport.org API](https://developers.teleport.org/api/getting_started/) to get back quality of life scores for the queried city.
- The job and city quality of life information is synthesized and sent back to the React front of the VibesVille project.

## Contributors

- [Dennis Nichols](https://github.com/dennis-nichols) was the primary developer of this REST API.
- [Seth Pierce](https://github.com/sethppierce) and [Elias Staehle](https://github.com/EDStaehle) provided code review and deployment support.
