OZMIKE BOT

The ozmike bot is a tool used to help ensure you are able to checkout And
purchase the shoe you are wanting on time and for a proper price.

SETUP:
To get setup and begin using the app all you need to do is clone the Repo
and run npm install!

Links:
Deployed Front-End: https://mozoria.github.io/ozmike-bot/#/
Front-End Repo: https://github.com/mozoria/ozmike-bot
Deployed Back-End: https://glacial-badlands-90267.herokuapp.com/
Back-End Repo: https://github.com/mozoria/ozmike-bot-api

ERD:
https://imgur.com/gallery/ST3sJOk

Technologies Used:
React, Node, Express, MongoDB, Bootstrap

Unsolved Issue:
Something I would like to do in the future is connect it to a 3rd party api in order to display somewhere on the app the latest shoe/clothing that is releasing to have something in mind and just bring more attention to the page.

METHOD	Routes
POST	/sign-up
POST	/sign-in
DELETE	/sign-out
PATCH	/change-password
GET	/shoes
POST	/shoes
PATCH	/shoes/:id
DELETE	/shoes/:id

Development Story:
What went into planning primarily focused on the goal of the actual app and whether I not I actually wanted the bot to be able to simulate a real experience for the user to have an idea of how it would work on another site. As well as what the bot actually needed to know in order to fill out the required fields.

The process involed focusing on getting the basics down, and formatting the site correctly to have an idea of how I wanted it to flow and appear. The next step was creating a multi step form that would entail save all the information the user put into it to be used at a later time. The next step would be creating a add to cart/ checkout page to simulate the process and then eventually creating the bot itself.
Problem solving, was mainly determining how to properly use React to do a certain task, compared to plain Javascript. Which revolved around a lot of googling, and asking my peers for my help.
