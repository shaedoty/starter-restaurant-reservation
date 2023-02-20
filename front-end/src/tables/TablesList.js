import React from "react";
import TableCard from "./TableCard";

// Defines the tables list for the dashboard page.

export default function TablesList({ tables }) {
  const tablesList = tables.map((table) => {
    return <TableCard key={table.table_id} table={table} />;
  });



  return (
    <div className="d-flex justify-content-center flex-wrap">{tablesList}</div>
  )
}
