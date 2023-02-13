import React from "react";

// Defines the table options for use in the SeatReservations component.

export default function TableOptions({ table }) {
  return (
    <option value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  );
}
