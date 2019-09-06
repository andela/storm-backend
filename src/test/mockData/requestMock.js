export default {
  validTripRequest: {
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
  },
  validMultiCityRequest: {
    userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    type: 'one-way',
    originCity: 'Lagos',
    destinationCity: 'Abuja',
    departureDate: '2019-08-26 10:25:00',
    reason: 'To See Ibadan and Abuja Managers',
    accommodation: 'Eko Hotel',
    subRequest: [
      {
        subTripOriginCity: 'Lagos',
        subTripDestinationCity: 'Ibadan',
        subTripDepartureDate: '2019-08-26 10:25:00',
        subTripReason: 'To See Ibadan Manager',
        subTripAccommodation: 'Ibadan Hotel'
      },
      {
        subTripOriginCity: 'Ibadan',
        subTripDestinationCity: 'Abuja',
        subTripDepartureDate: '2019-08-26 10:25:00',
        subTripReason: 'To See Abuja Manager',
        subTripAccommodation: 'Abuja Hotel'
      }
    ]
  },
  multiCityBadRequest: {
    userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
    type: 'one-way',
    originCity: 'Lagos',
    destinationCity: 'Abuja',
    departureDate: '2019-08-26 10:25:00',
    reason: 'To See Ibadan and Abuja Managers',
    accommodation: 'Eko Hotel',
    subRequest: [
      {
        subTripOriginCity: 'Lagos',
        subTripDepartureDate: '2019-08-26 10:25:00',
        subTripReason: 'To See Ibadan Manager',
        subTripAccommodation: 'Ibadan Hotel'
      },
      {
        subTripDestinationCity: 'Abuja',
        subTripDepartureDate: '2019-08-26 10:25:00',
        subTripReason: 'To See Abuja Manager',
        subTripAccommodation: 'Abuja Hotel'
      }
    ]
  },
  requestToBeRejected: {
    requestId: 'b2092fb0-502a-4105-961f-2d310d340168',
    wrongRequestId: 'b2092fb0-502a-4105-961f-2d310d340109'
  }
};
