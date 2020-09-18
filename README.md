# Collab Notes

## Table of Contents

- [Application Link](#application-link-link)
- [Application description](#application-description-information_source)
- [Application Setup](#main-problems-heavy_exclamation_mark)
- [Main Problems](#main-problems-heavy_exclamation_mark)
- [My Solutions](#my-solutions-bulb)
- [User Stories](#user-stories)
- [User Journey](#user-joruney-train2)
- [MVP](#mvp-rainbow)
- [Database Schema](#database-schema-file_cabinet)
- [Tech-Stack](#Tech-Stack)

## Application Link :link:

[check it out from here](https://collab-notes.herokuapp.com/)

### Team members

- Ali Dahdouh

## Application description :information_source:

![](https://i.imgur.com/9YnBFvH.png)

An app to help people to make quick post-it notes to help them organize their ideas and what they want to share instantly in real-time, the users will create boards and post notes and all users on the board can see all the notes right away.

## Application Setup :mag:

- clone this repo
  `git clone https://github.com/alidah0/collab-notes.git`

- run `npm i && cd client npm i && npm run build` to install all dependencies & dev-dependencies for the app and also build react on the server.

* add config.env file that contains Secret_Cookie as Environmental Variable and Mongodb Url for your database.

#### Environment Variables

Environment variables are one of the ways that we use to keep our product safe. If you want to access our app locally you will need to add your own.

First create a **config.env** file and add the following variables:

```
Secret_Cookie
```

- get Google OAuth 2.0 Client Secret and Client ID from [Google APIs](https://console.developers.google.com/apis/credentials), these will assign to Environmental Variables also your home page URL will be assing to CLIENT_HOME variable

Client ID

```
G_Key
```

Client secret

```
G_Secret
```

```
CLIENT_HOME
```

- config.env will looks like this :

  ![](https://i.imgur.com/Q2afApQ.png)

#### Database Setup

- Create MongoDB database account from [here](https://account.mongodb.com/account/register).
- Now you can set the **database url** in your **_config.env_** as follows (setting the values in square brackets to the values you defined in MongoDB website url above):

`mongodb+srv://[username:password]@host:port/[database]?options...`

- Add a these two variables in config.env and added database url that you created as shown above :

```
DB_URI = mongodb url xxxxxxxx

```

#### Run the Project

- In terminal access to project folder on your machine write: `npm start`

## Main Problems :heavy_exclamation_mark:

1- Meetings on zoom and google meet or meeting tool are important but you cannot write down the important ideas and share with others.

2- Notes website are not real-time, you have to refresh the page to see the updates.

3- Apps have complicated steps to register and start work.

## My Solutions :bulb:

1- Easy and fast tool to make notes with many color options.

2- Real-time changes without refreshing the page.

3- This app provides one-click to register and one-click to start working or start working as a guest user.

## User Stories:

user can ..

- sign in with Google.
- access any board as a guest user without signing in.
- create boards and save them on his own board.
- access any board any time by board name
- post notes to the board in real-time
- many people can share one board and collaborate
- choose different colors by random color generators.
- edit the notes after the posting.
- drag the note to the trash bin to delete it.
- leave the board and switch to another.
- see who's online in the board.
- clear all the notes in the board.
- more to come ...

## User Joruney: :train2:

The user will open the app, then he will click sign in by google, then he will add the board name, then he will enter the board, other collaborators of the board will get the name of the board from their friend who created the board and will enter to share others with ideas and projects plans.

## MVP :rainbow:

![](https://i.imgur.com/OJTxWVt.gif)

## Database Schema :file_cabinet:

![](https://i.imgur.com/gMMoIxp.png)

## Tech-Stack

- Node.js
- Express.js
- Passport ( OAuth 2.0 )
- Mongoose
- React.js
- React Hooks
- Socket.io
- yup
