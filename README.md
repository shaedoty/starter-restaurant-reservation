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
| `GET` | `/reservations` | Lists all reservations for the current date. |
`POST`| `	/reservations` | 	Creates and returns a new reservation.
  `GET` |  `/reservations?date=YYYY-MM-DD` | 	Lists all reservations on the query date.
`GET`| `	/reservations/:reservation_id` | Reads a specific reservation by reservation_id.
`PUT` | `	/reservations/:reservation_id` | Updates and returns the reservation matching the reservation_id.
`PUT`| `/reservations/:reservation_id/status`| 	Updates only the status of a reservation.
`GET`| `/tables`|Lists all tables.
`POST`|`/tables`| Creates and returns a new table
`PUT`|`	/tables/:table_id/seat`| Updates a table with a reservation Id and changes status to "seated".
`DELETE`|`/tables/:table_id/seat`| Updates a table by deleting reservation Id and changes status to "finished".


