const userId = '122a0d86-8b78-4bb8-b28f-8e5f7811c456';

const validAccommodationDetail = {
  country: 'Nigeria',
  city: 'lagos',
  address: '2, Alausa Ikeja',
  accommodation: 'OrientalHotel',
  accommodationType: ['Hotel', 'Motel'],
  roomType: ['single', 'double'],
  numOfRooms: 50,
  description: 'The best hotel in lagos state',
  facilities: ['Free-Wifi', 'Television', 'Parking space'],
  images: '/home/oluwatobi/Pictures/jpeg2000-home.jpg'
};

const inValidAccommodationDetail = {
  country: 'Nigeri',
  city: 'lagos',
  address: '2, Alausa Ikeja',
  accommodation: 'OrientalHotel',
  accommodationType: ['Hotel', 'Motel'],
  roomType: ['single', 'double'],
  numOfRooms: 50,
  description: 'The best hotel in lagos state',
  facilities: ['Free-Wifi', 'Television', 'Parking space'],
};

const validBookingDetails = {
  tripRequestId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
  typeOfRoom: ['single', 'double'],
  numOfRooms: 1,
  adults: 2,
  children: 0,
  checkIn: '2019-09-03',
  checkOut: '2019-09-06'
};

const inValidBookingDetails = {
  tripRequestId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
  typeOfRoom: ['Single'],
  numOfRooms: 1,
  adults: 2,
  children: 0,
  checkIn: '2019-09-03',
  checkOut: '2019-09-06'
};


const inValidBookingDate = {
  tripRequestId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
  typeOfRoom: ['single'],
  numOfRooms: 1,
  adults: 2,
  children: 0,
  checkIn: '2019-09-09',
  checkOut: '2019-09-06'
};

export {
  validAccommodationDetail,
  inValidAccommodationDetail,
  validBookingDetails,
  inValidBookingDetails,
  inValidBookingDate,
  userId
};