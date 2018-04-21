# Check-In-Server
A Javascript webpage that allows multiple users to 'check in' to a class or event monitored by an admin

This project was developed for CMPT 218 - Special Topics in Computing Science

## NPM Dependencies
This project requires `express` and `mongodb`

Be sure to use `npm install` to ensure the project compiles

## Using this project
I have commented out my mongodb database URL for obvious security reasons. Make sure you fill these variables

`var url` and `database = client.db('')` 

if you plan on testing out this project. The port number is at a default 3000.

## Features

**For Admin**

The admin will be able to log into the `admin login` fields. Upon logging in, the admin will be taken to a landing page where a `Check-In ID` can be entered. The admin can either

- Start the check-in process
- View all users who have checked into that particular check-in ID
- Delete all users who have check into that particular check-in ID

When starting the check-in process, the admin can check who was the last person to check in. Stopping the check-in process will display all the users who have checked into the session and store these users into the Mongo Database.

**For Users**

The users will click the `CHECK-IN NOW` button, which will lead them to a form to fill in. The users will fill in

- The `Check-In ID` they wish to check into
- Their Name
- Their student ID

and can click `CHECK-IN`. If there is no check-in process currently ongoing by an admin, the user will not be able to check in.
