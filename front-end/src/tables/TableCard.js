import React from "react";
import { useHistory } from "react-router";
import { unSeatTable } from "../utils/api";


export default function TableCard({ table }) {
  const history = useHistory();

  const handleFinishClick = async (event) => {
    event.preventDefault();
    const message = `Is this table ready to seat new guests? This cannot be undone.`;
    try {
      if (window.confirm(message)) {
        await unSeatTable(table.table_id);
        history.go(0);
      }
    } catch (error) {
      return error;
    }
  };

  // Defines the text for the table status based on whether or not a reservation is assigned to a table.
  function statusText() {
    if (table.reservation_id) {
      return "occupied";
    } else {
      return "free";
    }
  }

  // Defines the Bootstrap classNames for color based on whether or not a reservation is assigned to a table.
  function statusColor() {
    if (table.reservation_id) {
      return "primary";
    } else {
      return "success";
    }
  }

  // return (
  //   <tr>
  //     <td className="text-left">
  //       {table.table_name}
  //     </td>
  //     <td className="text-center">
  //       {table.capacity}
  //     </td>
  //     <td
  //       className="text-center"
  //       data-table-id-status={table.table_id}
  //     >
  //       {statusText()}
  //     </td>
  //     <td className="text-center">
  //       {table.reservation_id && (
  //         <button
  //           className="btn btn-sm btn-danger text-center"
  //           data-table-id-finish={table.table_id}
  //           onClick={handleFinishClick}
  //         >
  //           <span className="oi oi-check mr-2" />
  //           Finish
  //         </button>
  //       )}
  //     </td>
  //   </tr>
  // );

  return (
    <div
      className="card text-dark bg-light mb-3 shadow-lg m-3"
      style={{ width: "250px" }}
    >
  
      <div className="card-header pb-0">
        <h5 className="card-title text-center">Table: {table.table_name}</h5>
      </div>
      <div className="card-body">
        {/* table capacity */}
        <h6 className="card-subtitle mb-2  text-center text-muted">
          <span className="oi oi-people m-2"> </span> Capacity: {table.capacity}
        </h6>
        
        <h6
          className={`card-subtitle mb-2 text-center text-${statusColor()}`}
          data-table-id-status={table.table_id}
        >
          {statusText()}
        </h6>
     
        <div className="text-center">
          {table.reservation_id && (
            <button
              className="btn btn-sm btn-danger text-center"
              data-table-id-finish={table.table_id}
              onClick={handleFinishClick}
            >
              <span className="oi oi-check mr-2" />
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
