export class HistoricDataOptions {
  public baseUrl: string;
  public maximumParallelDownloads: number;

  constructor() {
    this.baseUrl = 'https://historicdata.betfair.com';
    this.maximumParallelDownloads = 2;
  }
}
