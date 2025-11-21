# Technical interview
This repository contains the starting files for the technical interview for the Full Stack Engineer applications at TXT Arcan.

Applicants should fork this repository, complete the test, and submit the link to their solution to the hiring manager/HR contact.

For any quetions related to the test, please contact `darius.sas _at_ arcan.tech`.

## The task
### Goal
The goal is to build a full stack web application where the backend services exposes a REST API that serves data to a frontend that visualizes it.

The backend simulates retrieving data from a database, in the `./data` folder as if it's being retrieved from a database.
The backend service should expose REST APIs.
The frontend must have at most plot/graph. The rest of the information must be visualized in tables.

It is recommended that the backend uses [https://docs.astral.sh/uv/](https://docs.astral.sh/uv/) as package manager, and FastAPI to expose APIs.

### Expected output
- A brief report (max 1000 words) explaining the key technical decisions
- A *dockerized* full-stack application complete with Docker Compose file that start the application building the images in `frontend` and `backend`.

The output should be submitted as a link to a fork of this repository.

Please do not spend more than **4 hours** of work on this task. The report and the code have an equal weight during the evaluation of your submission.
However, do prioritize the report in case you do not manage to finish the code, detailing the actions you planned to implement.

### The data
The data represents the output of a response of one of our services. It is the goal of the task to understand the different parts of the data. Please describe your understanding in the report. `aoi` stands for Area Of Impact.

## Instructions
The repository contains a basic configuration that you can use as a starting point.

Unzip the data with the following commands
```bash
cd data
tar xzf data.tar.gz
```

The data folder is mounted to the backend service at `/data`, which you can use to read the data.
