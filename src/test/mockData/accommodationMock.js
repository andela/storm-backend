const userId = '122a0d86-8b78-4bb8-b28f-8e5f7811c456';

const validAccommodationDetail = {
  country: 'Nigeria',
  city: 'lagos',
  address: '2, Alausa Ikeja',
  accommodation: 'OrientalHotel',
  accommodationType: ['Hotel', 'Motel'],
  roomType: ['Single', 'Double'],
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
  roomType: ['Single', 'Double'],
  numOfRooms: 50,
  description: 'The best hotel in lagos state',
  facilities: ['Free-Wifi', 'Television', 'Parking space'],
};

export {
  validAccommodationDetail,
  inValidAccommodationDetail,
  userId
};
