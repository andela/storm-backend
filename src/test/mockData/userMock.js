export default {
  validUser: {
    firstName: 'Annie',
    lastName: 'Skywalker',
    email: 'lordvader@gmail.com',
    phoneNo: '08077777777',
    password: 'Password'
  },

  validUser2: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd@gmail.com',
    phoneNo: '08077777772',
    password: 'Password2',
  },

  inValidUser: {
    firstName: 'Annie',
    lastName: 'Skywalker',
    email: 'test@test.com',
    phoneNo: '08077777777',
    password: 'Pas'
  },

  inValidEmail: {
    firstName: 'Annie',
    lastName: 'Skywalker',
    email: 'testtest.com',
    phoneNo: '08077777777',
    password: 'Pas'
  },

  undefinedPhone: {
    firstName: 'Annie',
    lastName: 'Skywalker',
    email: 'testtest.com',
    phoneNo: '',
    password: 'Pas'
  },

  updateUser: {
    firstName: 'Luke',
    lastName: 'Skywalker',
    phoneNo: '080777778654',
    gender: 'gender is required',
    lineManager: 'lineManager is required',
    birthDate: '11-09-1990',
    preferredCurrency: 'preferredCurrency is required',
    preferredLanguage: 'preferredLanguage is required',
    currentLocation: 'currentLocation is required'
  },
  anotherUserId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
  userId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
  wrongId: '122a0d86-8b78-4bb8-b28f-8e5f7811c459',
  invalidUuid: '122a0d86-8b78-4bb8-b28f-8e5f7'
};
