# Monster AI Assignment
## Image Feed with magic link authentication using supertokens

## Introduction
A mern stack application for uploading images and passwordless authentication using email.

## Features
The key features of the application.

- User can login or signup without passoword
- User can upload images and see displaying in dashboard

## Demo Vedio link
[link](https://drive.google.com/file/d/1AZf0jkJvwtahtXEnFZV2CcKysxFMuWMN/view?usp=sharing)

## Installation or How to run the app
I created cloud database using MongoDb Atlas. So, if you want to run our code then please read the instructions below :
- Clone our repository `[https://github.com/harishreyya/zarektronix.git](https://github.com/harishreyya/Image_feed.git)`
-Now run `npm install` or `npm i` which will install all the required packages of node
- After installation, now run `npm run server` and  you will see `server is listening on 5002` 
- Simultaneously, open a new terminal and run `cd frontend` by which you get into frontend folder
- Now here, run `npm install` or `npm i` which will install all the required packages of react as well
- After installation, now run `npm start` and  you will see a new window will be opening in the default browser which is running on port `http://localhost:3000`
- Now you see app running, you can add your email and signin without password.


## Technology Stack
List and provide a brief overview of the technologies used in the project.

- MongoDB
- Express JS
- React JS
- Node JS
 
 ### Dependencies and packages

#### Backend
- `mongoose`<br/>
  connecting MongoDB to the Node js server
- `nodemon`<br/>
  It monitors your project and automatically restarts when it detects any changes.
- `cors`<br/>
  allowing browser should permit the loading of resources
- `cloudinary`<br/>
  uploads images to cloud and makes a url
- `dotenv`<br/>
  enviromental variables to store secret keys
- `supertokens`<br/>
  used for authencation without password
#### Frontend
- `axios`<br/>
  JavaScript library to make HTTP requests or fetch data
- `react-router-dom`<br/>
  implementation of dynamic routing
- `supertokens`<br/>
  used for authencation without password

