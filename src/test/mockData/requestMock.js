export default {
  validTripRequest: {
    userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    type: 'one-way',
    originCity: 'Abuja',
    destinationCity: 'New Delhi',
    departureDate: '2019-08-21 17:59:04.305+00',
    reason: 'Holiday',
    accommodation: 'Transcorp Hotel'
  },
  badInputTripRequest: {
    type: 'one-way',
    destinationCity: 'New Delhi',
    departureDate: '2019-08-21 17:59:04.305+00',
    reason: 'Holiday',
    accommodation: 'Transcorp Hotel'
  },
  oneWayTripRequestWithReturnDate: {
    type: 'one-way',
    originCity: 'Abuja',
    destinationCity: 'New Delhi',
    departureDate: '2019-09-21 17:59:04.305+00',
    returnDate: '2020-08-21 17:59:04.305+00',
    reason: 'Holiday',
    accommodation: 'Transcorp Hotel'
  },
  validReturnTripRequest: {
    type: 'return',
    originCity: 'Abuja',
    destinationCity: 'New Delhi',
    departureDate: '2019-09-21 17:59:04.305+00',
    returnDate: '2020-08-21 17:59:04.305+00',
    reason: 'Holiday',
    accommodation: 'Transcorp Hotel'
  },
  returnTripRequestWithDepartureGreaterThanReturnDate: {
    type: 'return',
    originCity: 'Abuja',
    destinationCity: 'New Delhi',
    departureDate: '2020-09-21 17:59:04.305+00',
    returnDate: '2019-08-21 17:59:04.305+00',
    reason: 'Holiday',
    accommodation: 'Transcorp Hotel'
  }
};
