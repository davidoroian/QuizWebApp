# Project 2: Quiz app

## Description

This is a web application for managing quiz topics, questions and answers where users can do the following:
- register into the application
- login with the registered credentials
- see all of the available topics (only admins can add new ones and delete existing ones)
- add and delete questions for a certain topic
- add and delete answers for a certain question
- try to answer random questions for a certain topic in the quiz section
- there is an api available for getting a random question's data at `/api/questions/random` path and submitting a json document with parameters `questionId` and `optionId` at `/api/questions/answer` in order to get a response which states whether the answer option to the question is a correct one

## Run app locally

In order to run the app locally, assuming you have the `docker-compose` command availabe, go into the folder which has the `docker-compose.yml` file and run `docker-compose up` command, after it runs without errors you can open a browser and go to the address `http://localhost:7777/` and should see the running app

## Run app online

You can use the app at the address `https://broken-night-5209.fly.dev/` as it is deployed using `fly.io`

## Admin login

In order to login as admin use email: `admin@admin.com` and password: `123456`

## Run tests

In order to run the tests run the command `docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf` into the directory where you have the app