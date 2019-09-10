'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accommodation', [
      {
        id: '122a0d86-8b78-4bb8-b28f-8e5f7811c452',
        country: 'Nigeria',
        city: 'Lagos',
        accommodation: 'Eko Hotel',
        address: '1415 Adetokunbo Ademola Street, Victoria Island, Lagos',
        accommodationType: 'Hotel',
        roomType: ['Single', 'Double', 'Executive'],
        numOfRooms: 50,
        description: 'Eko Hotel is the main building on our property and it houses most of the attractive features which Eko Hotels & Suites has become known for. These include 447 ...',
        images: ['https://res.cloudinary.com/dmlapwmzj/image/upload/v1567513691/rk-items/qae7hr6mlqfwkhvqpguq.jpg', 'https://res.cloudinary.com/dmlapwmzj/image/upload/v1567513691/rk-items/qae7hr6mlqfwkhvqpguq.jpg'],
        facilities: ['Free-WIFI', 'Parking', '24/7 Electricity', 'Pool', 'Free breakfast', 'Airport transportation'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fb94de4d-47ff-4079-89e8-b0186c0a3be6',
        country: 'Nigeria',
        city: 'Lagos',
        accommodation: 'Lagos Continental Hotel',
        address: 'Plot 52, Kofo Abayomi Street, Victoria Island, Lagos, Nigeria.',
        accommodationType: 'Hotel',
        roomType: ['Single', 'Double', 'Executive'],
        numOfRooms: 50,
        description: 'The Lagos Continental Hotel, is a 5-Star Hotel located at Plot 52A, Kofo Abayomi Street, Victoria Island, within the heart of the central business district of Lagos Nigeria.',
        facilities: ['Free-WIFI', 'Parking', '24/7 Electricity'],
        images: ['https://res.cloudinary.com/dmlapwmzj/image/upload/v1567513691/rk-items/qae7hr6mlqfwkhvqpguq.jpg', 'https://res.cloudinary.com/dmlapwmzj/image/upload/v1567513691/rk-items/qae7hr6mlqfwkhvqpguq.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: '0ce36391-2c08-4703-bddb-a4ea8cccbbc1',
        country: 'Turkey',
        city: 'Istanbul',
        accommodation: 'Apple Tree Hotel',
        address: 'Sultanahmet Mah Akbiyik Cad No:79, Fatih, 34122 Istanbul, Turkey',
        accommodationType: 'Hotel',
        roomType: ['Single', 'Double', 'Executive'],
        numOfRooms: 50,
        description: 'Located in Sultanahmet area, Apple Tree Hotel is just 300 m from Blue Mosque.The hotel offers free WiFi throughout the property. Every room at this hotel is air conditioned and is equipped with a flat-screen TV.',
        facilities: ['Free-WIFI', 'Parking', '24/7 Electricity'],
        images: ['https://res.cloudinary.com/dmlapwmzj/image/upload/v1567513691/rk-items/qae7hr6mlqfwkhvqpguq.jpg', 'https://res.cloudinary.com/dmlapwmzj/image/upload/v1567513691/rk-items/qae7hr6mlqfwkhvqpguq.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accommodation', null, {});
  }
};
