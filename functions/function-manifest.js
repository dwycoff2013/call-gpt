<<<<<<< HEAD
// create metadata for all the available functions to pass to completions API
const tools = [
  {
   /*  type: 'function',
    function: {
      name: 'checkInventory',
      say: 'Let me check our inventory right now.',
      description: 'Check the inventory of airpods, airpods pro or airpods max.',
      parameters: {
        type: 'object',
        properties: {
          model: {
            type: 'string',
            'enum': ['airpods', 'airpods pro', 'airpods max'],
            description: 'The model of airpods, either the airpods, airpods pro or airpods max',
          },
        },
        required: ['model'],
      },
      returns: {
        type: 'object',
        properties: {
          stock: {
            type: 'integer',
            description: 'An integer containing how many of the model are in currently in stock.'
          }
        }
      }
    },
  },
  {
    type: 'function',
    function: {
      name: 'checkPrice',
      say: 'Let me check the price, one moment.',
      description: 'Check the price of given model of airpods, airpods pro or airpods max.',
      parameters: {
        type: 'object',
        properties: {
          model: {
            type: 'string',
            'enum': ['airpods', 'airpods pro', 'airpods max'],
            description: 'The model of airpods, either the airpods, airpods pro or airpods max',
          },
        },
        required: ['model'],
      },
      returns: {
        type: 'object',
        properties: {
          price: {
            type: 'integer',
            description: 'the price of the model'
          }
        }
      }
    },
  },
  {
    type: 'function',
    function: {
      name: 'placeOrder',
      say: 'All right, I\'m just going to ring that up in our system.',
      description: 'Places an order for a set of airpods.',
      parameters: {
        type: 'object',
        properties: {
          model: {
            type: 'string',
            'enum': ['airpods', 'airpods pro'],
            description: 'The model of airpods, either the regular or pro',
          },
          quantity: {
            type: 'integer',
            description: 'The number of airpods they want to order',
          },
        },
        required: ['type', 'quantity'],
      },
      returns: {
        type: 'object',
        properties: {
          price: {
            type: 'integer',
            description: 'The total price of the order including tax'
          },
          orderNumber: {
            type: 'integer',
            description: 'The order number associated with the order.'
          }
        }
      }
    },
  }, */
    type: 'function',
    function: {
      name: 'transferCall',
      say: 'One moment while I transfer your call.',
      description: 'Transfers the customer to a live agent in case they request help from a real person.',
      parameters: {
        type: 'object',
        properties: {
          callSid: {
            type: 'string',
            description: 'The unique identifier for the active phone call.',
          },
        },
        required: ['callSid'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Whether or not the customer call was successfully transfered'
          },
        }
      }
    },
  },
  {
    type: 'function',
    function: {
        name: 'book_appointment_in_zoho_bookings',
        description: 'function to book an appointment with the client.',
        parameters: {
          type: 'object',
          properties: {
            First_Name: {
              type: 'string',
              description: 'First name of the customer'
            },
            Last_Name: {
              type: 'string',
              description: 'Last name of the customer'
            },
            Case_Number: {
              type: 'string',
              description: 'Unique identifier for the case'
            },
            Appointment_Time: {
              type: 'string',
              description: 'Desired time for the appointment in ISO 8601 format'
            }
          },
        },
      required: ['First_Name', 'Last_Name', 'Case_Number', 'Appointment_Time'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Whether or not the appointment was successfully booked.'
          },
        }
      }
      }
  ];

module.exports = tools;
=======
// function-manifest.js
const tools = [
    {
      type: 'function',
      function: {
        name: 'transferCall',
        say: 'One moment while I transfer your call.',
        description: 'Transfers the customer to a live agent.',
        parameters: {
          type: 'object',
          properties: {
            callSid: {
              type: 'string',
              description: 'The unique identifier for the active phone call.'
            }
          },
          required: ['callSid']
        },
        returns: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Transfer status (success/failure).'
            }
          }
        }
      }
    },
    {
      type: 'function',
      function: {
        name: 'book_appointment_in_zoho_bookings',
        say: 'One moment while I book your appointment.',
        description: 'Books an appointment in Zoho Bookings.',
        parameters: {
          type: 'object',
          properties: {
            customerName: {
              type: 'string',
              description: 'Customer\'s full name.'
            },
            customerEmail: {
              type: 'string',
              description: 'Customer\'s email address.'
            },
            customerPhoneNumber: {
              type: 'string',
              description: 'Customer\'s phone number.'
            },
            appointmentTime: {
              type: 'string',
              description: 'Appointment time (e.g., YYYY-MM-DD HH:mm:ss).'
            },
            caseNumber: { // Optional parameter
              type: 'string',
              description: 'Case number (if applicable).'
            }
          },
          required: ['customerName', 'customerEmail', 'customerPhoneNumber', 'appointmentTime'] // Removed Case_Number from required
        },
        returns: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Booking status (success/failure).'
            },
            appointmentId: { // Include appointmentId in the return type
              type: 'string',
              description: 'The ID of the booked appointment.'
            },
            error: { // Include potential error information
              type: 'string',
              description: 'Error details if booking failed.'
            }
          }
        }
      }
    }
  ];
  
  module.exports = tools;
>>>>>>> c46cc77 (repo commit for GCP biuld on Cloud Run)
