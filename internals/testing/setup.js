require('dotenv').config();

require('babel-core/register')({
  presets: [
    'es2015',
    'flow'
  ],
  plugins: ['transform-object-rest-spread'],
});

/* External dependencies */
const { blue, green, red, yellow } = require('chalk');
const jsonFile = require('jsonfile');
const moment = require('moment');
const rimraf = require('rimraf');

/* Internal dependencies */
const Trello = require('../../src/index').default;

const key = process.env.TRELLO_API_KEY || '';
const token = process.env.TRELLO_AUTH_TOKEN || '';
const trello = new Trello({ key, token });

let resourceIds = {};

const outputFilePath = './tests/resources/resource-ids.json';

const logDetails = (stage, message) => {
  const timeCompleted = moment().format('HH:mm:ss');
  const messageWithTime = `${message} at ${timeCompleted}`;
  switch (stage) {
    case 0:
      console.log(blue(messageWithTime));
      break;

    case 1:
      console.log(green(messageWithTime));
      break;

    case 2:
      console.log(red(messageWithTime));
      break;

    default:
      break;
  }
};

const creationMessage = (resourceName) => {
  let idsToDisplay = [];
  Object.keys(resourceIds).forEach((key) => {
    if (key.toString().includes(resourceName)) {
      idsToDisplay.push(resourceIds[key]);
    }
  });
  const properResourceName =
    resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
  return `${properResourceName}s created with Ids: ${idsToDisplay}`;
};

const writeResultsToFile = () => new Promise((resolve, reject) => {
  if (!resourceIds) {
    reject(new Error('No ID data to write'));
  }

  logDetails(0, 'Writing to JSON file');
  jsonFile.writeFile(outputFilePath, resourceIds, { spaces: 2 }, (error) => {
    if (error) {
      logDetails(2, 'Error writing to JSON file');
      reject(new Error(error));
    }
    logDetails(1, 'JSON file succesfully written');
    resolve();
  });
});

const createChecklists = (idCard) => new Promise((resolve, reject) => {
  logDetails(0, 'Creating Checklists');
  Promise.all([
    trello.cards(idCard).checklists().addChecklist({ name: 'Checklist A' }),
    trello.cards(idCard).checklists().addChecklist({ name: 'Checklist B' }),
    trello.cards(idCard).checklists().addChecklist({ name: 'Checklist C' }),
  ])
    .then((responses) => {
      resourceIds.checklistAId = responses[0].data.id || '0';
      resourceIds.checklistBId = responses[1].data.id || '0';
      resourceIds.checklistCId = responses[2].data.id || '0';
      logDetails(1, creationMessage('checklist'));
      resolve();
    })
    .catch((error) => {
      logDetails(2, 'Error creating Checklists');
      reject(new Error(`Could not create Checklists: ${error}`));
    });
});

const createCards = (idList) => new Promise((resolve, reject) => {
  logDetails(0, 'Creating Cards');
  Promise.all([
    trello.lists(idList).cards().addCard({ name: 'Card A' }),
    trello.lists(idList).cards().addCard({ name: 'Card B' }),
    trello.lists(idList).cards().addCard({ name: 'Card C' }),
  ])
    .then((responses) => {
      resourceIds.cardAId = responses[0].data.id || '0';
      resourceIds.cardBId = responses[1].data.id || '0';
      resourceIds.cardCId = responses[2].data.id || '0';
      logDetails(1, creationMessage('card'));
      resolve(resourceIds.cardAId);
    })
    .catch((error) => {
      logDetails(2, 'Error creating Cards');
      reject(new Error(`Could not create Cards: ${error}`));
    });
});

const createLists = (idBoard) => new Promise((resolve, reject) => {
  logDetails(0, 'Creating Lists');
  Promise.all([
    trello.boards(idBoard).lists().addList({ name: 'List A', pos: 0 }),
    trello.boards(idBoard).lists().addList({ name: 'List B', pos: 1 }),
    trello.boards(idBoard).lists().addList({ name: 'List C', pos: 2 }),
  ])
    .then((responses) => {
      resourceIds.listAId = responses[0].data.id || '0';
      resourceIds.listAId = responses[1].data.id || '0';
      resourceIds.listCId = responses[2].data.id || '0';
      logDetails(1, creationMessage('list'));
      resolve(resourceIds.listAId);
    })
    .catch((error) => {
      logDetails(2, 'Error creating Lists');
      reject(new Error(`Could not create Lists: ${error}`));
    });
});

const createLabels = (idBoard) => new Promise((resolve, reject) => {
  logDetails(0, 'Creating Labels');
  Promise.all([
    trello.boards(idBoard).labels().addLabel({ name: 'Label A', color: 'blue'}),
    trello.boards(idBoard).labels().addLabel({ name: 'Label B', color: 'red'}),
  ])
    .then((responses) => {
      resourceIds.labelAId = responses[0].data.id || '0';
      resourceIds.labelBId = responses[1].data.id || '0';
      logDetails(1, creationMessage('label'));
      resolve(idBoard);
    })
    .catch((error) => {
      logDetails(2, 'Error creating Labels');
      reject(new Error(`Could not create Labels: ${error}`));
    });
});

const createBoards = (idOrganization) => new Promise((resolve, reject) => {
  logDetails(0, 'Creating Boards');
  Promise.all([
    trello.boards().addBoard({ idOrganization, name: 'Board A' }),
    trello.boards().addBoard({ idOrganization, name: 'Board B' }),
  ])
    .then((responses) => {
      resourceIds.boardAId = responses[0].data.id || '0';
      resourceIds.boardBId = responses[1].data.id || '0';
      logDetails(1, creationMessage('board'));
      resolve(resourceIds.boardAId);
    })
    .catch((error) => {
      logDetails(2, 'Error creating Boards');
      reject(new Error(`Could not create Boards: ${error}`));
    });
});

const createOrganization = () => new Promise((resolve, reject) => {
  logDetails(0, 'Creating Organization');
  trello.organizations().addOrganization({
    displayName: 'TFW Testing',
    desc: 'This is for testing',
  })
    .then((response) => {
      resourceIds.orgId = response.data.id || '0';
      logDetails(1, `Organization created with Id: ${resourceIds.orgId}`);
      resolve(resourceIds.orgId);
    })
    .catch((error) => {
      logDetails(2, 'Error creating Organization');
      reject(new Error(`Could not create Organization: ${error}`));
    })
});

const createAllResources = () => new Promise((resolve, reject) => {
  createOrganization()
    .then(createBoards)
    .then(createLabels)
    .then(createLists)
    .then(createCards)
    .then(createChecklists)
    .then(() => resolve())
    .catch((error) => { reject(error); })
});

const deleteExistingTestFile = () => new Promise((resolve, reject) => {
  rimraf(outputFilePath, (error) => {
    if (error) {
      reject(new Error(error));
    }
    resolve();
  });
});

deleteExistingTestFile()
  .then(createAllResources)
  .then(writeResultsToFile)
  .then(() => console.log(yellow('Done')))
  .catch(error => console.error(red(error)));
