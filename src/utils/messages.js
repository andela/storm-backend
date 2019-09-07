const messages = {
  welcome: 'Welcome to Barefoot Nomad',
  apiV1Welcome: 'Welcome to Barefoot Nomad API (version 1)',
  notFound: 'Sorry, we cannot find this endpoint',
  emailExists: 'Email address already in use',
  phoneExists: 'Phone number already in use',
  userNotFound: 'User not found, please check your email address',
  incorrectPassword: 'Incorrect password',
  validEmail: 'Enter a valid email address',
  validName: 'Name must be alphabet without number',
  validPassword: 'Minimum of 6 letters, a character and number required',
  noToken: 'Token missing, you need a token to have access',
  blacklisted: 'The token has been blacklisted',
  loggedOut: 'Logged out successfully',
  userNotFoundId: 'User not found',
  serverError: 'Internal server error',
  unauthorizedUserProfile: 'You are not authorized to edit this profile',
  unauthorizedUserRequest: 'You are not authorized to view this users request',
  invalidToken: 'Token you provided is invalid',
  invalidUserId: 'userId provided is not a valid uuid string',
  noRequests: 'No requests to display',
  error: 'An unexpected error occur...',
  noResult: 'No request result found',
  roleChanged: 'The staff role has been successfully set to a',
  forbidden: 'You are not authorized to perform this operation',
  unauthorized: 'You do not have authorization',
  chatAdded: 'Message added successfully',
  inValidCountry: 'Incorrect country',
  noImage: 'No Image found',
  acceptedTripRequest: 'Trip request successfully accepted',
  rejectedTripRequest: 'Trip request successfully rejected',
  requestNotFoundId: 'Request not found',
  notExistAccommodation: 'Accommodation not found',
  lowercase: 'Room types should be in lower case',
  invalidRoom: (roomType) => `${roomType} not present in accommodation`
};

export default messages;
