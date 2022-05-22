import axios from 'axios';

/**
 * call API for View Holidays read
 * @constant
 * @type {function}
 * @returns {promises}
 */
export const fetchHolidays = (values) => {
  const urlVersion = `${process.env.REACT_APP_VIEW_HOLIDAYS}`;

  const data = {
    "bookingType": "hotel",
    "location": values.city.toLowerCase(),
    "departureDate": values.startDate,
    "duration": "7",
    "partyCompositions": [
      {
        "adults": 2,
        "childAges": [],
        "infants": 0
      }
    ]
  }
  return axios.post(urlVersion, data);
};
