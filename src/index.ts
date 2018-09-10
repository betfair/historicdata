import * as BasketSizeReport from './BasketSizeReport';
import * as DataPackage from './DataPackage';
import * as downloadFile from './downloadFile';
import * as downloadListOfFiles from './downloadListOfFiles';
import * as filter from './filter';
import * as getAdvBasketDataSize from './getAdvBasketDataSize';
import * as getCollectionOptions from './getCollectionOptions';
import * as GetMyData from './GetMyData';
import * as HistoricDataOptions from './historicDataOptions';

export { BasketSizeReport, DataPackage, filter, HistoricDataOptions };

export class HistoricData {
  private sessionToken: string;
  private currentDownloads = 0;
  private options: HistoricDataOptions.HistoricDataOptions;

  constructor(
    token: string,
    options?: HistoricDataOptions.HistoricDataOptions
  ) {
    // Save the currently active session token so we can use it later
    this.sessionToken = token;

    // Set the users options or use the default ones
    this.options = options
      ? options
      : new HistoricDataOptions.HistoricDataOptions();
  }

  /**
   * This function will return all the package you have purchased so you can see what you have access to.
   */
  public getMyData = (): Promise<DataPackage.DataPackage[]> => {
    return new Promise((res, rej) => {
      GetMyData.GetMyData.GetMyData(
        this.sessionToken,
        this.options.baseUrl
      ).then((data: DataPackage.DataPackage[]) => {
        res(data);
      });
    });
  };

  public getCollectionOptions = (
    filterToUse: filter.Filter
  ): Promise<filter.Filter> => {
    return new Promise((res, rej) => {
      getCollectionOptions.GetCollectionOptions.GetCollectionOptions(
        this.sessionToken,
        filterToUse,
        this.options.baseUrl
      ).then((data: any) => {
        res(data);
      });
    });
  };

  /**
   *
   */
  public getAdvBasketDataSize = (
    filterToUse: filter.Filter
  ): Promise<BasketSizeReport.BasketSizeReport> => {
    return new Promise((res, rej) => {
      getAdvBasketDataSize.GetAdvBasketDataSize.GetAdvBasketDataSize(
        this.sessionToken,
        filterToUse,
        this.options.baseUrl
      ).then((data: any) => {
        res(data);
      });
    });
  };

  public downloadListOfFiles = (
    filterToUse: filter.Filter
  ): Promise<string[]> => {
    return new Promise((res, rej) => {
      while (this.currentDownloads >= this.options.maximumParallelDownloads) {
        //
      }

      this.currentDownloads++;
      downloadListOfFiles.DownloadListOfFiles.DownloadListOfFiles(
        this.sessionToken,
        filterToUse,
        this.options.baseUrl
      ).then((data: any) => {
        this.currentDownloads--;
        res(data);
      });
    });
  };

  public downloadFile = (filePath: string, dropFolder: string): Promise<boolean> => {
    return new Promise((res, rej) => {
      downloadFile.DownloadFile.DownloadFile(
        this.sessionToken,
        filePath,
        dropFolder,
        this.options.baseUrl
      ).then(data => {
        res(data);
      });
    });
  };
}
