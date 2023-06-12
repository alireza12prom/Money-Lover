export class TimeService {
  private constructor() {}

  static lastNHourDate(n: number) {
    return new Date(Date.now() - n * 3600 * 1000);
  }

  static nextNHourDate(n: number) {
    return new Date(Date.now() + n * 3600 * 1000);
  }
}
