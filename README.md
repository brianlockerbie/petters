# project2_petters - May 27th 2022

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Local Usage](#Local-Usage)
- [Links](#Links)
- [Questions](#Questions)

##

## Description

Petters is a social media application dedicated to pets. Pet owners can congregate on this app and put their pets on their well-deserved pedestal while also exploring the lives of other, equally awesome pets. Petters is set up as a traditional social media structure where users can freely explore other user uploaded content as well as be able to create accounts and share their own content. 

Petters uses complex algorithms to allow users to search other active users or to search by category. Additionally, users can also view a featured section where posts are dynamically rendered and displayed according to their specific interactions, which includes the top 5 posts of the day and the top 5 commented posts.

Petters was built using the MVC structure, using sequelize to handle data operations, and the handlebars template engine for the frontend. The app was pushed to heroku services using the Jawsdb database.

## Installation

1. To install application, clone the main project via the HTTP or SSH link on github.

```
git clone
```

2. Once cloned, open up the project folder in your text editor and run the following command in terminal to install all dependencies.

```
npm install
```

## Local-Usage

# Initial setup

Create an '.env' file in the main directory path and include the following data:

```
DB_NAME='your_database_name'
DB_USER='your_mysql_username'
DB_PW='your_mysql_password'
```

Once your '.env' has been created with the corresponding data, open up the schema ('db/schema.sql') and update the database label to match with the database you included in your '.env' file.

# Database reset

Before seeding the data, make sure to reset the database by setting 'force: false' to 'true' in the 'server.js' file and type this command in terminal:

```
npm start
```

After that, revert back to 'false' and exit the server by typing

```
control + c
```

# Seeding starter data into database and starting the server

To seed the database with the starter data, type this command in terminal:

```
npm run seeds
```

To start the server, type in terminal:

```
npm start
```

From there, you are ready to use the application!

## Links

[Link to live application](https://mvc-petters-social.herokuapp.com/)

## Built With

- Node.js
- Express.js
- Handlebars template engine
- Bcrypt
- Express sessions
- Sequelize
- Dotenv
- MySQL2
- Heroku
- JavaScript

## License

This project is covered under the MIT License

![Preview-image](https://user-images.githubusercontent.com/91699101/173210609-3b002d7a-fcf3-40f7-b989-209b89947217.png)


