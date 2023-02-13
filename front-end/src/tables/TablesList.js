import React from "react";
import TableCard from "./TableCard";

// Defines the tables list for the dashboard page.

export default function TablesList({ tables }) {
  const tablesList = tables.map((table) => {
    return <TableCard key={table.table_id} table={table} />;
  });

  // return (
  //   <div>
  //     <table className="table table-info table-striped table-hover table-bordered table-responsive-sm">
  //       <thead className="table table-info-dark">
  //         <tr>
  //           <th scope="col" className="text-left">Table Name</th>
  //           <th scope="col" className="text-center">Capacity</th>
  //           <th scope="col" className="text-center">Status</th>
  //           <th scope="col" className="text-center">Unseat Table</th>
  //         </tr>
  //       </thead>
  //       <tbody>{tablesList}</tbody>
  //     </table>
  //   </div>
  // );

  return (
    <div className="d-flex justify-content-center flex-wrap">{tablesList}</div>
  )
}
