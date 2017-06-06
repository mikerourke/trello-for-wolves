const key = process.env.TRELLO_API_KEY || '';
const token = process.env.TRELLO_AUTH_TOKEN || '';

export const auth = {
  key,
  token,
};

export const resourceIds = {
  actionId: '592b4b6716732423b99d7f9a',
  boardId: 'bJDPVV1A',
  cardId: 'GATVPdJ6',
  labelId: '5927718cced82109ffc85150',
  memberId: '56c266ee58b06885bc4e54e3',
  membershipId: '5927718c7a9e8015ddbedcfe',
};

export const logResult = (result) =>
  new Promise((resolve, reject) => {
    if (result.data) {
      console.log(result.data);
      resolve();
    } else {
      reject();
    }
  });
