import * as request from 'request';

export class GetMyData {
    public static GetMyData: any = function (token: string) {
        return new Promise((res, rej) => {

            if (token.length < 10) { rej('Not token has been provided'); }

            var options = {
                method: 'GET',
                url: 'http://localdata.betfair.com/api/GetMyData',
                headers: {
                    ssoid: token,
                },
            };

            request(options, function (error, response, body) {
                if (error) rej(error);
                res(JSON.parse(body));
            });
        });
    };
}

export class dataPackage {
    // The string name of the sport
    public sport: string;

    // The string name of the plan
    public plan: string;

    // The Month that this item covers
    public forDate: string;

    // The ID of the purchased item
    public purchaseItemId: string;
}
