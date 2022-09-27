# Readme 

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![Lint code base](https://github.com/lassesuomela/ohire/actions/workflows/super-linter.yml/badge.svg)
![Build the backend](https://github.com/lassesuomela/ohire/actions/workflows/node.js.yml/badge.svg)
[![Build frontend](https://github.com/lassesuomela/ohire/actions/workflows/node.js.frontend.yml/badge.svg)](https://github.com/lassesuomela/ohire/actions/workflows/node.js.frontend.yml)
![Deliver to VPS](https://github.com/lassesuomela/ohire/actions/workflows/cd.yml/badge.svg)
![Demo website](https://img.shields.io/website?down_message=Offline&label=Demo&up_message=Online&url=https%3A%2F%2Flassesuomela.com)

---

This is online hiring site. Backend is created with Node.js and database that was used is MySQL. Frontend is made with [Vue.js](https://vuejs.org/) and [element-plus](https://element-plus.org/en-US/) UI library.

## Demo
Demo of this repository will be available at [https://jobs.lassesuomela.com](https://jobs.lassesuomela.com).

---
## How to run backend
- `cd ./backend`
- run `npm i`
- install sql scheme with `*.sql` file
- create ".env" file and populate it with your credentials
  - `DB_HOST=localhost`
  - `DB_USERNAME=root`
  - `DB_PASSWORD=root`
  - `DB_DATABASE=ohire`
  - `TOKEN=some_secret_token_for_jwt_auth`
- run `npm start` and the backend is running at [http://localhost:8081](http://localhost:8081)
---
## How to run frontend
- `cd ./frontend`
- run `npm i`
- run `vue serve` and the frontend is running at [http://localhost:8080](http://localhost:8080)

---
## Screenshots below from the site

Login page
!["Login page"](/images/login.png)

Register user page
!["Register user page"](/images/register.png)

Register company page
!["Register company page"](/images/register_company.png)

Job listings page
!["Job listings page"](/images/jobs_page.png)

Job listings page #2
!["Job listings page 2"](/images/jobs_page_2.png)

Job details page
!["Job details page"](/images/job_details.png)

Apply for a job page
!["Apply for a job page"](/images//user_apply_job.png)

User profile page
!["User profile page"](/images/user_profile.png)

Company profile page
!["User profile page"](/images/company_profile.png)

Create job listing page
!["Create job listing page"](/images/company_create_jobs.png)

Company jobs page
!["Company jobs page"](/images/company_jobs.png)

View job applications page
!["View job applications page"](/images/company_applications.png)

View meetings page
!["View meetings page"](/images/meetings.png)