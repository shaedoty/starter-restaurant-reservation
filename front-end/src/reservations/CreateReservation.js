import React from "react";
import ReservationForm from "./ReservationForm";

// Defines the CreateReservation component for the new reservation page.

export default function CreateReservation() {
  return (
    <div>
      <h1 className="my-4">New Reservation</h1>
      <ReservationForm />
    </div>
  );
}
