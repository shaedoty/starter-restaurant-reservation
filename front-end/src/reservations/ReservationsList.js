import React from "react";
import ReservationCard from "./ReservationCard";


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
