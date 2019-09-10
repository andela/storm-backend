export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        id: 'd3f48eaa-2f44-464e-9f71-c00ac903a95c',
        content: 'Do you need to visit the other city?',
        ownerId: 'fb94de4d-47ff-4079-89e8-b0186c0a3be8',
        requestId: 'ba94c67b-1d18-4628-ab12-ce2efe46f00b',
      },
      {
        id: '6e424556-2d3b-48b8-b8e0-63be73fd972e',
        content: 'The accomodation chosen has been banned',
        ownerId: '122a0d86-8b78-4bb8-b28f-8e5f7811c456',
        requestId: 'ba94c67b-1d18-4628-ab12-ce2efe46f00b',
      },
      {
        id: 'f77442bd-7a65-4e58-90c3-e2709f9d8ca8',
        content: 'Yes',
        ownerId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        requestId: 'ba94c67b-1d18-4628-ab12-ce2efe46f00b',
      },
      {
        id: 'f6f1c19a-b013-40cc-a95b-fbd2fe209c4a',
        content: 'Alright',
        ownerId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        requestId: 'ba94c67b-1d18-4628-ab12-ce2efe46f00b',
      },
      {
        id: '72fc67c0-ce67-49fc-ac7c-21313f959a55',
        content: 'This comment should be deleted',
        ownerId: '0ce36391-2c08-4703-bddb-a4ea8cccbbc5',
        requestId: 'ba94c67b-1d18-4628-ab12-ce2efe46f00b',
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
