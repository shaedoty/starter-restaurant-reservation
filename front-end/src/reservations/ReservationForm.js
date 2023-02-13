import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import ErrorAlert from "../layout/ErrorAlert";

// Defines the form for creating or editing a reservation on the new reservation and edit reservation pages.
// If 'editMode' is true, the form is used to edit an existing reservation.

export default function ReservationForm({
  existingReservation,
  editMode = false,
}) {
  const URL = process.env.REACT_APP_API_BASE_URL + "/reservations";
  const history = useHistory();

  const intialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState(
    existingReservation || intialFormState
  );
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name !== "people") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        people: parseInt(event.target.value),
      });
    }
  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setFormData({
      ...formData,
      mobile_number: formattedPhoneNumber,
    });
  };

  // Handles a request to update an existing reservation or create a new reservation.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const abortController = new AbortController();
    try {
      if (editMode) {
        await axios.put(`${URL}/${existingReservation.reservation_id}`, {
          data: formData,
          signal: AbortController.signal,
        });
      } else {
        await axios.post(URL, {
          data: formData,
          signal: AbortController.signal,
        });
      }
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setError(error.response.data.error);
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <div className="mb-4">
        <ErrorAlert error={error} />
      </div>
      <form onSubmit={handleSubmit}>
        {/* first and last name fields */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <span className="oi oi-person mr-2"></span>
              Name
            </span>
          </div>
          <label className="sr-only" htmlFor="first_name">
            First Name:
          </label>
          <input
            name="first_name"
            type="text"
            id="first_name"
            placeholder="First Name"
            className="form-control"
            aria-label="first_name"
            style={{ maxWidth: 200 }}
            required={true}
            value={formData.first_name}
            onChange={handleChange}
          />
          <label className="sr-only" htmlFor="last_name"></label>
          <input
            name="last_name"
            type="text"
            id="last_name"
            placeholder="Last Name"
            className="form-control"
            aria-label="last_name"
            style={{ maxWidth: 200 }}
            required={true}
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        {/* mobile number field */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-phone mr-2"></span>
              Mobile Number
            </span>
          </div>
          <label className="sr-only" htmlFor="mobile_number">
            Mobile Number:
          </label>
          <input
            name="mobile_number"
            type="tel"
            id="mobile_number"
            placeholder="XXX-XXX-XXXX"
            className="form-control"
            aria-label="mobile_number"
            style={{ maxWidth: 200 }}
            required={true}
            minLength="12"
            value={formData.mobile_number}
            onChange={handlePhoneNumberChange}
          />
        </div>

        {/* date field */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-calendar mr-2"></span>
              Date
            </span>
          </div>
          <label className="sr-only" htmlFor="reservation_date">
            Date of Reservation:
          </label>
          <input
            name="reservation_date"
            type="date"
            id="reservation_date"
            placeholder="YYYY-MM-DD"
            className="form-control"
            aria-label="reservation_date"
            style={{ maxWidth: 200 }}
            required={true}
            value={formData.reservation_date}
            onChange={handleChange}
          />
        </div>

        {/* time field */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-clock mr-2"></span>
              Time
            </span>
          </div>
          <label className="sr-only" htmlFor="reservation_time">
            Time of Reservation:
          </label>
          <input
            name="reservation_time"
            type="time"
            id="reservation_time"
            placeholder="HH:MM"
            className="form-control"
            aria-label="reservation_time"
            style={{ maxWidth: 200 }}
            pattern="[0-9]{2}:[0-9]{2}"
            required={true}
            value={formData.reservation_time}
            onChange={handleChange}
          />
        </div>

        {/* people field */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <span className="oi oi-people mr-2"></span>
              People
            </span>
          </div>
          <label className="sr-only" htmlFor="people">
            Number of People:
          </label>
          <input
            name="people"
            type="number"
            id="people"
            className="form-control"
            aria-label="people"
            style={{ maxWidth: 200 }}
            min="1"
            required={true}
            value={formData.people}
            onChange={handleChange}
          />
        </div>

        {/* buttons */}
        <button
          type="button"
          className="btn btn-secondary mr-1 mb-3"
          onClick={() => history.goBack()}
        >
          <span className="oi oi-circle-x mr-2" />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mx-1 mb-3">
          <span className="oi oi-circle-check mr-2" />
          Submit
        </button>
      </form>
    </div>
  );
}
