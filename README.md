# JobPostingProject
Job posting board project for software engineering

Project overview site can be found here: https://projectsiteswe.firebaseapp.com/

## How to Run
**To run locally:**
Clone the repo and open the index.html file in Chrome

**To host locally on Firebase:**
```
firebase serve
```
Then command + click the link that appears. Should be localhost:somenumber

**To deploy on Firebase:**
```
firebase deploy
```
Then command + click the link that appears. Should be https://glassceilingswe.firebaseapp.com.

### Code Files Setup
All of the website code is in the public folder. The home page code is located in the index.html file with the corresponding styling located in the index.css file.

### Authentication Folder
Contains the authentication scripts and html that we are following for our own authentication. This code came from the Firebase github example of implementing Firebase authentication.

### Bias Training Folder 
Contains the bias training page html and css files. 

### Blog Folder
Contains the html and css files for the blog page. 

### Candidate Folder
Has all of the folders and code that a prospective candidate will see for their pathway. Contains the following folders:
- ***Expanded Job Results:*** contains the html, css, and javascript files for the expanded job results page.
- ***Filter:*** currently empty, but will eventually contain the html and css for the job search filter popup
- ***Job Results:*** contains the html, css, and javascript for the initial job results page.
- ***Search Page:*** contains the html, css, javascript files for the job search page.
- ***Signup Login:*** contains the signup, login, and signup-login html and css files. The signup-login html contains an iform container that reference the signup and login html pages. This allows the user to switch between different signup/login pages without actually changing pages.
- ***User Profile:*** contains the html and css for the user profile page. 

### Company Folder
- ***Add Job Role:*** currently contains the html, css, and javascript files for the add job role page.
- ***Candidate Results:*** contains the html, css, and javascript files for the candidate results page.
- ***Company Profile:*** contains the html and css files for the company profile page
- ***Contact:*** currently empty, but will eventually contain the html and css for the employer to contact a candidate.
- ***Current Job Listings:*** currently empty, but will eventually contain the html and css for the employer to see all of their current job listings.
- ***Expanded Candidate Results:*** contains the html, css, and javascript files for the expanded candidate results.
- ***Favorites:*** currently empty, but will eventually contain the html and css for the employer to see their favorited candidates.
- ***Hiring Landing:*** currently contains the html and css files for the company landing page that allows them to choose whether they are searching for a candidate or posting a job.
- ***Signup Login:*** contains the signup, login, and signup-login html and css files. The signup-login html contains an iform container that reference the signup and login html pages. This allows the user to switch between different signup/login pages without actually changing pages.

### Mission Folder
Contains the html, css, and image files for the mission page.

### Salary Negotiation Folder
Contains the html and css files for the salary negotiation page.