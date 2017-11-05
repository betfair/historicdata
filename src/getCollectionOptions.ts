import * as request from 'request';

export class GetCollectionOptions {
  public static GetCollectionOptions: any = function (token: string) {
    return new Promise((res, rej) => {

      if (token.length < 10) { rej('Not token has been provided'); }

      var options = {
        method: 'POST',
        url: 'http://localdata.betfair.com/api/GetCollectionOptions',
        headers:
        {
          'content-type': 'application/json',
          ssoid: token
        },
        body:
        {
          sport: 'Horse Racing',
          plan: 'Basic Plan',
          fromDay: 1,
          fromMonth: 3,
          fromYear: 2017,
          toDay: 31,
          toMonth: 3,
          toYear: 2017,
          eventId: null,
          eventName: null,
          marketTypesCollection: ['WIN', 'PLACE'],
          countriesCollection: ['GB', 'IE'],
          fileTypeCollection: ['M']
        },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) rej(error);
        res(body);
      });

    });
  };
}
