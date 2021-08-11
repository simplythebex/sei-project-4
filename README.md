# Project 4: PetPals

## Overview

Petpals was my final project during my time at General Assembly. It was a solo project, programmed using Python and Django in the backend with a SQLite database. The front end was built using React.js and SASS and Bootstrap were used to style the project.

PetPals is my take on Borrow My Doggy. As a huge cat lover, with no space for a pet in a London flat, I was disappointed that Borrow My Doggy only caters to one type of animal lover. Therefore I set out to create a pet sharing app that allows the sharing of all types of animals.

My app allows for two types of user; an owner can create a profile for themselves and for their pets, while a borrower can create just their own profile. As a borrower the user can view pets and their availability, and send a request to the owner of the pet they wish to borrow. Owners can choose to accept or decline the requests that they receive.

## Deployed Version

https://sei56-petpals.herokuapp.com/

To explore the app please log in.
Owner login details: owner@email.com, pw: owner12345! 
Borrower login details: borrower@email.com, pw: borrower12345! 

## Brief

Create a full-stack app using Python, Django and a SQL database. The app should have CRUD functionality and should contain several models and relationships of different types.

## Timeframe

9 days.

## Technologies

### Planning
Figma
Trello
Miro

### Backend
Python
Django
SQLite
### Frontend
JavaScript
React
HTML
CSS/SASS
Bootstrap

### Other
Git
Github

## Approach 

### Planning
After deciding on the project I took my time to plan each stage, and to ensure that I understood the models and relationships I needed to create in order to meet the goals for my MVP. These goals were:
Create an app that allows users to create a profile
If users own a pet they should be able to add a profile for the pet
If users wants to borrow a pet they should be able to see available pets
Owners should be able to view borrowers profiles 
User and animal profile should contain details about availability and activities
Borrowers should be able to send a request to the owner of a pet they wish to borrow

I created a flowchart in Miro to help me picture the organisation of my backend, and to keep track of the models and relationships I needed. I then created a list of the requests I would need to make to my APIs:


I then planned out which requests would be required in my backend in order to make my MVP possible, and decided that I needed the following:

Get Requests
/users (to get user profile data)
/animals (to get animal profile data)

Post Requests
/users (to add a user profile)
/animals (to add an animal profile)
/requests (to add a borrow request)

Put Requests
/requests (to edit the borrow request status - accept or decline)

Finally I completed my planning by creating a Trello board for the project, with all of the tasks I would need to complete for the MVP and any extra features I would like to implement given time. 



### Creating the Backend
There were five models required for my Backend: Users, Animals, Requests, Schedules and Activities. I created these, and created the associated requests. Throughout this time I made sure to test each request in insomnia to ensure they functioned correctly.

Example Model:



### Creating the Frontend
The Frontend was built using React Hooks. I began building it after building out my Backend but was prepared to tweak my Backend if I ran into any issues displaying information on the Frontend. 
Throughout my work on the Frontend I wanted to keep my file structure as clean and clear as possible, so I was careful to keep all of my components organised within folders and ensure that all files were appropriately named.

I was also careful to style each page as I created it, to prevent needing to style the entire app towards the end of the project.

I created the Animal and User index pages initially, with cards to display each animal or user, that would link to a separate page with further information. While the React code was very similar for the user and animal displays, I chose to style each differently, with the intention that if a profile was able to access both borrower and animal index pages, the styling would make it clear that these were different.

Next I moved on to the register and login pages. I created separate register pages depending on whether the user was a borrower or an owner. If the user was an owner I wanted the user to immediately be redirected to a form that would allow them to create an animal profile. Creating this form was simple enough 


## Bugs
List of bugs that I know about
Page not updating when user accepts a request - look into conditional rendering 

## Wins

## Challenges
What was successful. What did I learn

## Future
Future plans for updates
