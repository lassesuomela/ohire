# Readme

This is online hiring web site. Backend is created with Node.js and database that was used is MySQL. Frontend is made with Vue.js and element-plus.

# Demo
Demo of this repository will be available at https://jobs.saunagaming.com.

---
# How to run backend
  - `cd ./backend`
  - run `npm i`
  - install sql scheme with `*.sql` file
  - create ".env" file and populate it with your credentials
    - `DB_HOST`=localhost
	- `DB_USERNAME`=root
	- `DB_PASSWORD`=root
	- `DB_DATABASE`=ohire
    - `TOKEN`=some_secret_token_for_jwt_auth
  - run `npm start` and the backend is running at http://localhost:8081
  ---
  # How to run frontend
  - `cd ./frontend`
  - run `npm i`
  - run `vue serve` and the frontend is running at http://localhost:8080

---
# Screenshots below from the site

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