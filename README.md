# full-training-tracking-api
This will be my main project that I use for learning Backend Engineering. I will update it multiple times a week to the best of my ability.

1. Run npm install after cloning the repo.

2. For building the Docker image, run the following command in the terminal:
// docker build -t training-tracker .

3. Run the Docker container using the following command:
// docker run --env-file .env -p 3000:3000 training-tracker

3.1. Make sure your .env file includes the variables needed:
// PORT, DATABASE_URL and JWT_SECRET

