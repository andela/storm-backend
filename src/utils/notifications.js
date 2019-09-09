const newNotification = (title, body, actionLink, actionText) => ({
  title, body, actionLink, actionText
});

export default {
  newRequest: (sender, _, ref) => newNotification(
    'New Travel Request',
    `You have a new travel request from ${sender.firstName} ${sender.lastName}, click to respond.`,
    `/request/${ref}`,
    'Respond'
  ),
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
  newComment: (sender, _, ref) => newNotification(
    'New Request Comment',
    `You have a new request comment from ${sender.firstName} ${sender.lastName}, click to reply.`,
    `/request/${ref}`,
    'Reply'
  ),
};
