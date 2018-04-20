import * as fs from 'fs';
import * as request from 'request';

export class DownloadFile {
  public static DownloadFile = (
    token: string,
    filePath: string,
    rootUrl: string
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      if (token.length < 10) {
        rej('Not token has been provided');
      }

      const options = {
        headers: {
          'content-type': 'application/json',
          ssoid: token,
        },
        method: 'GET',
        qs: { filePath },
        url: rootUrl + '/api/DownloadFile',
      };

      request(options).on('response', response => {
        const filename = response.headers['content-filename'];
        response.pipe(fs.createWriteStream('./downloads/' + filename));
        response.on('end', () => {
          res(true);
        });
      });
    });
  };
}
