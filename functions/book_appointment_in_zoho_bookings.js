require('dotenv').config();
const axios = require('axios');

const book_appointment_in_zoho_bookings = async function (appointmentData) {
  try {
    const { First_Name, Last_Name, Case_Number, Appointment_Time } = appointmentData;

    // Construct the Zoho Bookings API endpoint URL
    const apiEndpoint = `https://bookings.zoho.com/api/v1/appointments`; 

    // Prepare the request data
    const requestData = {
      "customer": {
        "first_name": First_Name,
        "last_name": Last_Name,
      },
      "start_datetime": Appointment_Time, // Assuming Appointment_Time is in ISO 8601 format
      "notes": `Case Number: ${Case_Number}` // Add case number to appointment notes
    };

    // Make the API request to Zoho Bookings
    const response = await axios.post(apiEndpoint, requestData, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_BOOKINGS_API_TOKEN}`, // Replace with your actual Zoho Bookings API token
        'Content-Type': 'application/json'
      }
    });

    // Handle the response
    if (response.status === 201) {
      console.log('Appointment booked successfully:', response.data);
      return { status: 'success', appointmentId: response.data.data.booking_id }; // Return success status and appointment ID
    } else {
      console.error('Error booking appointment:', response.data);
      return { status: 'failed', error: response.data }; // Return failed status and error details
    }
  } catch (error) {
    console.error('Error booking appointment:', error);
    return { status: 'failed', error: error.message }; // Return failed status and error message
  }
};

module.exports = book_appointment_in_zoho_bookings;
