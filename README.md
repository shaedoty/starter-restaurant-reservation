# Periodic Tables: Restaurant Reservation Application

Periodic Tables is a restaurant reservation booking and table management system. Users of this application can view, create, edit, and delete reservations. Users can also search for reservations via mobile-number. Users can create new tables and seat reservations at a specific table. When seating the reservation at a table, validation will occur to ensure that the table size is of capable capacity for the reservation.


## Live Application

[Frontend](https://restaurant-reservation-frontend-jt8p.onrender.com)-Deploys to Render

[Backend](https://restaurant-reservation-backend-cc4q.onrender.com/reservations)-Deploys to Render. Use ``` /reservations ``` or ```/tables``` routes.


## Technology Used

**Frontend:** Javascript, React, React Router, React Hooks, Bootstrap, HTML, CSS

**Backend:** Node.js, Express, PostgreSQL, Knex


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


## Installation

1. Fork and clone this repository.
2. Run cp ./back-end/.env.sample ./back-end/.env.
3. Update the ./back-end/.env file with the connection  URL's to your ElephantSQL database instance.
4. Run cp ./front-end/.env.sample ./front-end/.env.
5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5001.
6. Run npm install to install project dependencies.
7. Run npm run start:dev to start your server in development mode.


## Features
### Dashboard
Here you can see the tables avaliable as well as the reservations for the chosen date. The user can navigate through different dates at the top, choose to edit, choose seats, or cancel current reservations, or navigate to a different page with the sidebar links.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Dashboard%20with%20Reservations.png)

### New Reservation
Users can create a new reservation by clicking on the `+ New Reservation` link on the sidebar. Each reservation requires a first name, last name, mobile number, party size, reservation time, and reservation date. If any inputs are invalid, the user will get an informative error message.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/New%20Reservation.png)

### Edit Reservation
The Edit Reservation page allows a user to edit an existing reservation. When a user navigates to this page, the fields will be populated with the existing reservation's current information, which the user can edit. All constraints from the New Reservation page are present on this page. If any inputs are invalid, the user will get an informative error message.

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Edit%20Reservation.png)

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/New%20Table.png)

![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Search.png)


![App Screenshot](https://raw.githubusercontent.com/shaedoty/starter-restaurant-reservation/main/front-end/screenshots/Seat%20Reservation.png)

