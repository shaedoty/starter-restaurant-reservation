import React from "react";
import ReservationCard from "./ReservationCard";

// Defines the reservations list for the dashboard and search pages.
// If 'searchMode' is true, all reservations are returned for the search page.
// If 'searchMode' is false, reservations with a status of 'cancelled' are not returned for the dashboard.

export default function ReservationsList({ reservations, searchMode }) {
  if (searchMode) {
    const reservationsList = reservations.map((reservation) => {
      return (
        <ReservationCard
          key={reservation.reservation_id}
          reservation={reservation}
        />
      );
    });
    return <div>{reservationsList}</div>;
  } else {
    const reservationsList = reservations
      .filter((reservation) => {
        return reservation.status !== "cancelled";
      })
      .map((reservation) => {
        return (
          <ReservationCard
            key={reservation.reservation_id}
            reservation={reservation}
          />
        );
      });
    return <div>{reservationsList}</div>;
  }
}
