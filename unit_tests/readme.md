# Unit Tests
These unit tests are those for the JavaScript code which we have so far, namely the login and candidate user profile JS scripts. There is also JS code for a user to register, but the attributes used in registration and login are identical in the most up to date code (11/7/2019), and therefore we make the assumption that the login unit tests are sufficient enough to account for the register unit tests. These unit tests will be augmented as we go further into development. We also plan to increase the range of the unit tests within the next month to cover more tests cases. The test cases would have greater coverage, but it took considerable time to learn the unit test framework and how to dynamically generate tests in JavaScript using Mocha.

## Change of Direction
In Report 2, we originally planned to use Java classes in order to connect the database and front end. However, it is much simpler, more convenient, and quicker to implement the database and front end connections with JavaScript. As a result, the Java classes discussed in Report 2 are not present here since they do not apply any further. Moreover, Java will be used in another part of the site, namely the search engine API. 

## Development of Unit Tests
Notably, the JavaScript code in our system is not written in such a way that it can be tested as a unit, that is it is not written in function format and it also utilizes dependencies that make it difficult to test it as a mock object. Therefore, separate test scripts had to be written that created functions for unit tests.  The tests were run using the Mocha unit test framework in the Visual Studio Code IDE.  

## Unit Test Procedure
1. We downloaded Mocha in our VS Code IDE.
2. We checked our NODE_PATH in our environment variables in our system.
3. We generated tests cases.
4. We developed a test script for the unit tests.
5. We put our unit test results in a table to make them more readable.

### Table 1: Results of Login Unit Tests for Candidate and Company Users

| **Email Input**               | **Password Input** | **Result** |
|-------------------------------|--------------------|------------|
| "lhampto4@scmail.spelman.edu" | "glass1"           | Passed     |
| "zmcfadde@scmail.spelman.edu" | "glass2"           | Passed     |
| "jlangham@scmail.spelman.edu" | "glass3"           | Passed     |
| "uegwim@scmail.spelman.edu"   | "glass4"           | Passed     |
| "mruffin@scmail.spelman.edu"  | "glass5"           | Passed     |
| "leliawashere"                | "1998"             | Passed     |
| "zarirules"                   | 2000               | Passed     |
| "somebodypleasestopjaida"     | 1998               | Passed     |

The above tests reflect our current system, namely there is no input validation yet for whether or not a user put in a valid email or a valid password. This is reflected in the tests. Therefore, in the tests, the user inputs that are not valid emails and passwords pass the tests because they would not be kicked back by the system since we do not check for that yet. Note that length of emails and passwords is not a test case since our system already validates for lengths that are too small to be actual emails and passwords (less than 4 characters in the case of our system).

### Table 2: Results of Sign Up Unit Tests for Candidate and Company Users

| **Email Input**               | **Password Input** | **Result** |
|-------------------------------|--------------------|------------|
| "lhampto4@scmail.spelman.edu" | "glass1"           | Passed     |
| "zmcfadde@scmail.spelman.edu" | "glass2"           | Passed     |
| "jlangham@scmail.spelman.edu" | "glass3"           | Passed     |
| "uegwim@scmail.spelman.edu"   | "glass4"           | Passed     |
| "mruffin@scmail.spelman.edu"  | "glass5"           | Passed     |
| "leliawashere"                | "1998"             | Passed     |
| "zarirules"                   | 2000               | Passed     |
| "somebodypleasestopjaida"     | 1998               | Passed     |

The above tests reflect our current system, namely there is no input validation yet for whether or not a user put in a valid email or a valid password. This is reflected in the tests. Therefore, in the tests, the user inputs that are not valid emails and passwords pass the tests because they would not be kicked back by the system since we do not check for that yet. Note that length of emails and passwords is not a test case since our system already validates for lengths that are too small to be actual emails and passwords (less than 4 characters in the case of our system).


### Table 3: Results of Candidate Profile Unit Tests

| **Email Input**               | **Phone Number Input** | **Location Input** | **Education Input** | **Website URL Input**    | **Affiliations Input** | **LinkedIn URL Input**              | **JobSearch Input** | **Result** |
|-------------------------------|------------------------|--------------------|---------------------|--------------------------|------------------------|-------------------------------------|---------------------|------------|
| "lhampto4@scmail.spelman.edu" | "8885556969"           | "Atlanta, GA"      | "Doctorate"         |                          |                        | "www.linkedin.com/in/lelia-hampton" | true                | Passed     |
| "zmcfadde@scmail.spelman.edu" | "9198506909"           | "Durham, NC"       | "Doctorate"         |                          |                        |                                     | true                | Passed     |
| "jlangham@scmail.spelman.edu" | "6178092020"           | "Boston, MA"       | "Doctorate"         |                          |                        |                                     | true                | Passed     |
| "uegwim@scmail.spelman.edu"   | "2021881881"           | "Washington, D.C." | "Master's"          |                          |                        |                                     | true                | Passed     |
| "mruffin@scmail.spelman.edu"  | "4698045670"           | "Fort Worth, TX"   | "Doctorate"         |                          |                        |                                     | true                | Passed     |
| "leliawashere@gmail"          | "1998"                 |                    |                     | "leliahampton.github.io" |                        |                                     | true                | Passed     |
| "zarirules@gmail.com"         | "9198898817"           |                    |                     |                          |                        |                                     | false               | Failed     |
| "somebodypleasestopjaida"     | "6172298080"           |                    |                     |                          | "NSBE", "ACM", "IEEE"  |                                     | true                | Passed     |
| "leliawashere@gmail.com"      | "1998891777"           |                    |                     | "leliahampton.github.io" |                        |                                     | true                | Passed     |

Notably, for the user profile every field is not required and some fields are pre-populated on the backend (i.e. name, email, etc.). Consequently, the tests cases reflect this. In particular, every test case does not have every profile field possible. Some test cases were not generated because there are other mechanisms in place to prevent them being invalidly input. For instance, since education is a drop down, we do not expect many errors with this. You will also notice in the table that the four digit phone number does not cause a test failure. This is because we designed the unit cases to reflect the system, and in the system the length of phone numbers are not checked yet. The unit tests will be updated once we perform input validation to reflect our system. However, you will notice that having false for JobSearch actually results in a failed test; this is because JobSearch is true by default in the system. As stated, the invalid email does not throw an error because there is no mechanism to verify this input in our system.