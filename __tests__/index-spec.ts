import * as dotenv from 'dotenv';
import * as index from '../src/index';
import * as filter from '../src/filter';

dotenv.config();

var hdClient = new index.HistoricData(<string>process.env.BFTOKEN);

var myfilter: filter.Filter = new filter.Filter();
myfilter.sport = 'Horse Racing';
myfilter.plan = 'Basic Plan';
myfilter.fromDay = 1;
myfilter.fromMonth = 3;
myfilter.fromYear = 2017;
myfilter.toDay = 31;
myfilter.toMonth = 3;
myfilter.toYear = 2017;
myfilter.eventId = null;
myfilter.eventName = null;
myfilter.marketTypesCollection = ['WIN', 'PLACE'];
myfilter.countriesCollection = ['GB', 'IE'];
myfilter.fileTypeCollection = ['M'];

test('It should get my data', async () => {
  expect.assertions(3);

  return hdClient.getMyData().then(data => {
    expect(data).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].plan).toBeTruthy();
  });
});

test('it should GetCollectionOptions for horse racing markets', async () => {
  expect.assertions(3);

  return hdClient.getCollectionOptions(myfilter).then(data => {
    expect(data).toBeTruthy();
    expect(data.marketTypesCollection).toBeTruthy();
    expect(data.marketTypesCollection.length).toBe(2);
  });
});

test('it should GetAdvBasketDataSize for horse racing markets', async () => {
  expect.assertions(4);

  return hdClient.getAdvBasketDataSize(myfilter).then(data => {
    expect(data).toBeTruthy();
    expect(data.totalSizeMB).toBeTruthy();
    expect(data.fileCount).toBeTruthy();
    expect(data.fileCount).toBeGreaterThan(0);
  });
});

test('it should DownloadListOfFiles', async () => {
  expect.assertions(2);
  return hdClient.downloadListOfFiles(myfilter).then(data => {
    expect(data).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });
});

test('it should DownloadFile', async () => {
  expect.assertions(1);

  return hdClient
    .downloadFile('/data/xds/historic/BASIC/28133820/1.130026702.bz2')
    .then((data: boolean) => {
      expect(data).toBe(true);
    });
});

// Need to find out a better way to test this
test('it should DownloadFiles', done => {
  expect.assertions(1);

  hdClient.downloadListOfFiles(myfilter).then(data => {
    hdClient.downloadFile(data[0]).then(data => {
      expect(data).toBe(true);
    });
    hdClient.downloadFile(data[1]).then(data => {
      expect(data).toBe(true);
    });
    hdClient.downloadFile(data[2]).then(data => {
      expect(data).toBe(true);
    });
    hdClient.downloadFile(data[3]).then(data => {
      expect(data).toBe(true);
    });

    expect(data.length).toBeGreaterThan(0);
    done();
  });
});
