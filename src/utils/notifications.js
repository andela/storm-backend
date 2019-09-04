export default {
  newTravelRequest: (sender) => ({
    title: 'New Travel Request',
    body: `You have a new travel request from ${sender.firstName} ${sender.lastName}, click to respond.`,
  }),
};
