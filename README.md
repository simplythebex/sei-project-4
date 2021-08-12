# Project 4: PetPals

## Overview

Petpals was my final project during my time at General Assembly. It was a solo project, programmed using Python and Django in the backend with a SQLite database. The front end was built using React.js and SASS and Bootstrap were used to style the project.

PetPals is my take on Borrow My Doggy. As a huge cat lover, with no space for a pet in a London flat, I was disappointed that Borrow My Doggy only caters to one type of animal lover. Therefore I set out to create a pet sharing app that allows the sharing of all types of animals.

My app allows for two types of user; an owner can create a profile for themselves and for their pets, while a borrower can create just their own profile. As a borrower the user can view pets and their availability, and send a request to the owner of the pet they wish to borrow. Owners can choose to accept or decline the requests that they receive.

![Screenshot 2021-08-11 at 17 56 43](https://user-images.githubusercontent.com/73421779/129177933-de483fa1-80bb-441a-b50f-3126fc46ac95.png)

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
- Figma
- Trello
- Miro

### Backend
- Python
- Django
- SQLite

### Frontend
- React
- SASS
- Bootstrap
- Axios

### Other
- Git
- Github

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

<img width="823" alt="Miro flowchart" src="https://user-images.githubusercontent.com/73421779/129177972-30ff2ae3-ae96-4f22-adcf-e0e93a56e1d8.png">

I then planned out which requests would be required in my backend in order to make my MVP possible, and decided that I needed the following:

**Get Requests**
- /users (to get user profile data)
- /animals (to get animal profile data)

**Post Requests**
- /users (to add a user profile)
- /animals (to add an animal profile)
- /requests (to add a borrow request)

**Put Requests**
- /requests (to edit the borrow request status - accept or decline)

Finally I completed my planning by creating a Trello board for the project, with all of the tasks I would need to complete for the MVP and any extra features I would like to implement given time. 

<img width="1427" alt="Trello screenshot" src="https://user-images.githubusercontent.com/73421779/129178046-0dd5fcd7-699d-4b06-b338-7b7ed4c6b0b7.png">

### Creating the Backend
There were five models required for my Backend: Users, Animals, Requests, Schedules and Activities. I created these, and created the associated requests. Throughout this time I made sure to test each request in insomnia to ensure they functioned correctly.

Example Model:

<img width="953" alt="Animal models" src="https://user-images.githubusercontent.com/73421779/129178365-410c7f4f-4bf8-4932-9210-1b6ef1b25f67.png">


### Creating the Frontend
The Frontend was built using React Hooks. I began building it after building out my Backend but was prepared to tweak my Backend if I ran into any issues displaying information on the Frontend. 
Throughout my work on the Frontend I wanted to keep my file structure as clean and clear as possible, so I was careful to keep all of my components organised within folders and ensure that all files were appropriately named.

I was also careful to style each page as I created it, to prevent needing to style the entire app towards the end of the project.

As there are two types of user, I created two index pages. The animal index allows borrowers to view all animals available, while the user index allows all borrows to be viewed. In each, the results can be filtered to display those most relevant to the user. When a borrower views a pet profile they have the option to request to borrow that animal. 

On the owner side of the app, the requests are filtered and displayed. The owner can accept or decline the requests:

<img width="958" alt="Screenshot of requests" src="https://user-images.githubusercontent.com/73421779/129177840-faac9c0f-1f57-4fc3-84fb-fb91944b05e6.png">

## Bugs
While the majority of the pages work smoothly, I was unable to make the page refresh when a user accepts or declines the request. Initially I wanted the buttons to disappear on click, and either “accepted” or “declined” to be displayed. To resolve this I intend to research conditional rendering to find a solution.

While I am really happy with the styling on the app, I did not have time to check all of the responsiveness. I want to check that all pages are responsive and can be viewed on all screen sizes.

## Wins
This project has greatly improved my confidence as a developer. I am proud to have built the entire app myself and to have created the requests as a way of allowing users to interact.
Building the models and relationships was also a big win. My Backend is relatively large and I am happy to have managed to create this within the timeframe. I also have the capacity to build more into the Frontend, as I have made axios requests for editing and deleting profiles in the Backend.

## Challenges
Initially I had wanted a user to be able to be both an owner and a borrower if they wished, however once I was building the app I found that this was more complicated than I initially realised. With a short timeframe I decided to keep the profiles separate and focus on allowing users to send requests, and on styling the app. 

## Key Learnings
- **Python:** This was my first project using Python, and I enjoyed developing my skills.
- **React:** As my third project using React, I now have a strong understanding of its uses and am excited to continue using it in the future.
- **Django and SQL:** I had the opportunity to use new technologies in my Backend and enjoyed exploring the differences when compared to MongoDB, Express and Node, which I had used in my previous projects.

## Future
- Improving responsiveness.
- Adding functionality for users to send messages to each other.
- Combining profiles so that users can be both owners and borrowers.
