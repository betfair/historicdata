import * as filter from './filter';
import * as getMyData from './getMyData';
import * as getCollectionOptions from './getCollectionOptions';

export class HistoricData {
    private session_token: string;

    constructor(token: string) {
        this.session_token = token;
    }

    public getMyData = () => {
        return new Promise((res, rej) => {
            getMyData.GetMyData.GetMyData(this.session_token).then((data: any) => {
                res(data);
            });
        });
    };

    public getCollectionOptions = () => {
        return new Promise((res, rej) => {
            getCollectionOptions.GetCollectionOptions.GetCollectionOptions(this.session_token).then((data: any) => {
                res(data);
            });
        });
    };

}
