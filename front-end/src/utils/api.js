import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";
import axios from "axios";

// Defines the base URL for the API.
// The default values is overridden by the `API_BASE_URL` environment variable.
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

// Defines the default headers for these functions to work with `json-server`
const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

// Web Request Functions //

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  try {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
    return await fetchJson(url, { headers, signal }, [])
      .then(formatReservationDate)
      .then(formatReservationTime);
  } catch (error) {
    return error;
  }
}

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  try {
    return await fetchJson(url, { headers, signal }, []);
  } catch (error) {
    return error;
  }
}

export async function unSeatTable(table_id) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  try {
    return await axios.delete(url);
  } catch (error) {
    return error;
  }
}
