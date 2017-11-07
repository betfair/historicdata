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
        method: 'GET',
        url: rootUrl + '/api/DownloadFile',
        qs: { filePath },
        headers: {
          'content-type': 'application/json',
          ssoid: token,
        },
      };

      request(options).on('response', response => {
        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition.slice(
          21,
          contentDisposition.length
        );

        response.pipe(fs.createWriteStream('./downloads/' + filename));

        response.on('end', () => {
          res(true);
        });

      });
    });
  };
}
