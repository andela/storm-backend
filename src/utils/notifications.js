export default {
  newRequest: (sender, _, ref) => ({
    title: 'New Travel Request',
    body: `You have a new travel request from ${sender.firstName} ${sender.lastName}, click to respond.`,
    actionLink: `/request/${ref}`,
    actionText: 'Respond'
  }),
  approvedRequest: (_, __, ref) => ({
    title: 'Request approved',
    body: 'Request approved by Line Manager, click to view.',
    actionLink: `/request/${ref}`,
    actionText: 'View'
  }),
  rejectedRequest: (_, __, ref) => ({
    title: 'Request reejcted',
    body: 'Request rejected by Line Manager, click to view.',
    actionLink: `/request/${ref}`,
    actionText: 'View'
  }),
};
