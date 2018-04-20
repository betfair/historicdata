export class Filter {
  /** The text name of the sport (might be better to make this a enum) */
  public sport: string = '';
  /** The text plan, Basic Plan, Advanced Plan or Pro Plan (might be better to make this a enum) */
  public plan: string = '';

  /** The day to start from inclusive  */
  public fromDay: number = 0;
  /** The month start to start from inclusive  */
  public fromMonth: number = 0;
  /** The year to start from inclusive  */
  public fromYear: number = 0;

  /** The day to finish on (inclusive) */
  public toDay: number = 0;
  /** The month to finish on (inclusive) */
  public toMonth: number = 0;
  /** The yearto finish on (inclusive) */
  public toYear: number = 0;

  /** If you know the event id you can add it here */
  public eventId: string = '';
  /** The event name text to search for */
  public eventName: string = '';

  /** Addtional filters */
  public marketTypesCollection: string[] = [];
  public countriesCollection: string[] = [];
  public fileTypeCollection: string[] = [];

  constructor() {
    //
  }
}
