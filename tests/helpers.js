const key = process.env.TRELLO_API_KEY || '';
const token = process.env.TRELLO_AUTH_TOKEN || '';

const auth = {
  key,
  token,
};

exports.auth = auth;
