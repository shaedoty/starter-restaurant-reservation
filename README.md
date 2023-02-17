# Periodic Tables: Restaurant Reservation Application

Periodic Tables is a restaurant reservation booking and table management system. Users of this application can view, create, edit, and delete reservations. Users can also search for reservations via phone-number. Users can create new tables and seat reservations at a specific table. When seating the reservation at a table, validation will occur to ensure that the table size is of capable capacity for the reservation.


## Live Application

[Frontend](https://restaurant-reservation-frontend-jt8p.onrender.com)-Deploys to Render

[Backend](https://restaurant-reservation-backend-cc4q.onrender.com/reservations)-Deploys to Render. Use ``` /reservations ``` or ```/tables``` routes.


## Technology Used

**Frontend:** Javascript, React, React Router, React Hooks, Bootstrap, HTML, CSS

**Backend:** Node.js, Express, PostgreSQL, Knex


## Installation

1. Fork and clone this repository.
2. Run cp ./back-end/.env.sample ./back-end/.env.
3. Update the ./back-end/.env file with the connection  URL's to your ElephantSQL database instance.
4. Run cp ./front-end/.env.sample ./front-end/.env.
5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5001.
6. Run npm install to install project dependencies.
7. Run npm run start:dev to start your server in development mode.


## Routes

| Method | Route     | Description                |
| :-------- | :------- | :------------------------- |
| `GET`|`/reservations`|Lists all reservations for the current date. |
`POST`|`/reservations`|Creates and returns a new reservation.
`GET`|`/reservations?date=YYYY-MM-DD`|Lists all reservations on the query date.
`GET`|`/reservations/:reservation_id` | Reads a specific reservation by reservation_id.
`PUT` | `/reservations/:reservation_id` | Updates and returns the reservation matching the reservation_id.
`PUT`| `/reservations/:reservation_id/status`| 	Updates only the status of a reservation.
`GET`| `/tables`|Lists all tables.
`POST`|`/tables`| Creates and returns a new table
`PUT`|`/tables/:table_id/seat`| Updates a table with a reservation Id and changes status to "seated".
`DELETE`|`/tables/:table_id/seat`| Updates a table by deleting reservation Id and changes status to "finished".


## Features
### Dashboard
Here you can see the tables avaliable as well as the reservations for the chosen date. The user can navigate through different dates at the top, choose to edit, choose seats, or cancel current reservations, or navigate to a different page with the navbar links.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Dashboard%20with%20Reservations.png)

### New Reservation
Users can create a new reservation by clicking on the New Reservation link on the navbar. Each reservation requires a first name, last name, mobile number, party size, reservation time, and reservation date. If any inputs are invalid, the user will get an informative error message.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/New%20Reservation.png)

### Edit Reservation
The Edit Reservation page allows a user to edit an existing reservation. The user can navigate to this page from the Edit button on the reservation, which you can find through a phone number search or by going to the date of the reservation. When a user navigates to this page, the fields will be populated with the existing reservation's current information, which the user can edit. All constraints from the New Reservation page are present on this page. If any inputs are invalid, the user will get detailed error message.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Edit%20Reservation.png)

### New Table
The New Table page allows a user to create a new table in the restaurant. Table Name and Capacity fields both are required. The Table Name must be at least two characters. The Capacity must be at least 1. If any inputs are invalid the user will get an detailed error message.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/New%20Table.png)

## Search
The user may access the search feature by clicking the Search link on the navbar. When user clicks on the link it will redirect them to the search bar where the user can input any mobile number and will lookup to see if that mobile number has been used for a reservation. It will also show the status of the mobile number as either Seated, Booked, Cancelled, or Finished.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Search.png)

## Seat
To seat a reservation, the user can click on the Seat button, this will redirect the user to a new page where the user can view the reservation party size. It will also display to the user a dropdown table which will list all of the tables and the table's max seating.

If the party size is too big for the selected table or if that table is not available, an error will notify the user.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Seat%20Reservation.png)

## Cancel

User has the ability to cancel any reservation that has been created and yet to be seated. The user can navigate to this page from the Cancel button on the reservation, which you can find by going to the date of the reservation. Clicking on the Cancel button at the bottom of each reservation card will generate a confirmation dialog box that will ask the user to confirm the cancellation.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Cancel.png)

