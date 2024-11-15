require('dotenv').config();
const axios = require('axios');
<<<<<<< HEAD

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
=======
const FormData = require('form-data');

// Helper function to format date to 'dd-MMM-yyyy HH:mm:ss'
function formatToZohoDateTime(date) {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Chicago' // Adjust to your required timezone
  };

  // Format the date
  const formattedDate = new Date(date).toLocaleString('en-GB', options).replace(',', '');
  return formattedDate.replace(/(\d{2})-(\w{3})-(\d{4})/, '$1-$2-$3'); // Ensure the month is in short format
}

const book_appointment_in_zoho_bookings = async function (customerName, customerEmail, customerPhoneNumber, caseNumber, appointmentTime) {
  try {
    const apiEndpoint = `https://www.zohoapis.com/bookings/v1/json/appointment`;
    const accessToken = process.env.ZOHO_BOOKINGS_ACCESS_TOKEN;
    const refreshToken = process.env.ZOHO_BOOKINGS_REFRESH_TOKEN;
    const staffId = process.env.ZOHO_BOOKINGS_STAFF_ID;
    const serviceId = process.env.ZOHO_BOOKINGS_SERVICE_ID;

   // Format appointment times
    const fromTime = formatToZohoDateTime(appointmentTime);
    const toTime = new Date(appointmentTime);
    toTime.setMinutes(toTime.getMinutes() + 30); // Assuming a 30-minute appointment
    const formattedToTime = formatToZohoDateTime(toTime);
    // Construct request data using FormData
    const formData = new FormData();
    formData.append('service_id', serviceId);
    formData.append('staff_id', staffId);
    formData.append('from_time', fromTime);
    formData.append('to_time', formattedToTime);
    formData.append('customer_details', JSON.stringify({
      name: customerName,
      email: customerEmail,
      phone_number: customerPhoneNumber
    }));

    console.log("Formatted From Time:", fromTime);
    console.log("Formatted To Time:", toTime);  
    console.log("Request Data:", formData);

    let response;
    try {
      response = await axios.post(apiEndpoint, formData, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          ...formData.getHeaders() // Include FormData headers
        }
      });

      if (response.status === 201) {
        console.log('Appointment booked successfully:', response.data);
        return { status: 'success', appointmentId: response.data.data.booking_id };
      } else {
        console.error('Error booking appointment:', response.data);
        return { status: 'failed', error: response.data };
      }
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 401) {
        console.log("Access token expired, attempting to refresh...");
        try {
          const refreshResponse = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
              refresh_token: refreshToken,
              client_id: process.env.ZOHO_CLIENT_ID,
              client_secret: process.env.ZOHO_CLIENT_SECRET,
              grant_type: 'refresh_token'
            }
          });

          if (refreshResponse.status === 200) {
            const newAccessToken = refreshResponse.data.access_token;
            process.env.ZOHO_BOOKINGS_ACCESS_TOKEN = newAccessToken;

            try {
              const retryResponse = await axios.post(apiEndpoint, formData, {
                headers: {
                  Authorization: `Zoho-oauthtoken ${newAccessToken}`,
                  ...formData.getHeaders() // Include FormData headers
                }
              });

              if (retryResponse.status === 201) {
                console.log('Appointment booked successfully after token refresh:', retryResponse.data);
                return { status: 'success', appointmentId: retryResponse.data.data.booking_id };
              } else {
                console.error('Error booking appointment after refresh:', retryResponse.data);
                return { status: 'failed', error: retryResponse.data };
              }
            } catch (retryError) {
              console.error('Retry error:', retryError);
              return { status: 'failed', error: retryError.message };
            }
          } else {
            console.error('Refresh token error:', refreshResponse.data);
            return { status: 'failed', error: refreshResponse.data };
          }
        } catch (refreshError) {
          console.error('Refresh error:', refreshError);
          return { status: 'failed', error: refreshError.message };
        }
      } else {
        console.error('API error:', apiError);
        return { status: 'failed', error: apiError.message };
      }
    }
  } catch (generalError) {
    console.error('General error:', generalError);
    return { status: 'failed', error: generalError.message };
  }
};

module.exports = book_appointment_in_zoho_bookings;
>>>>>>> c46cc77 (repo commit for GCP biuld on Cloud Run)
