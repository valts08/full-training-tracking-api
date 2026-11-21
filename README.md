# full-training-tracking-api
This will be my main project that I use for learning Backend Engineering. I will update it multiple times a week to the best of my ability.

- Run npm install after cloning the repo.

- For building the Docker image, run the following command in the terminal:
// docker build -t training-tracker .

- Run the Docker container using the following command:
// docker run --env-file .env -p 3000:3000 training-tracker

- Make sure your .env file includes the variables needed:
// PORT, DATABASE_URL and JWT_SECRET

- Look at the compose.yaml file as an example for a setup. Currently it only includes a setup for a cloud hosted DB and the API service will need to be run locally. When I've set up cloud hosting for the API as well, I'll update the compose file.


To-dos:
- add try...catches for all routes reaching out to an external service (only Prisma for the time being)