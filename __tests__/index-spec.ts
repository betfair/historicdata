import * as dotenv from 'dotenv';
import * as index from '../src/index';

dotenv.config();
var hdClient = new index.HistoricData(<string>process.env.BFTOKEN);

test('It should get my data', async () => {
  expect.assertions(1);

  return hdClient.getMyData().then(data => {
    expect(data).toBeTruthy();
  });

});

test('it should GetCollectionOptions', async () => {
  expect.assertions(1);

  return hdClient.getCollectionOptions().then(data => {
    expect(data).toBeTruthy();
  });

});






