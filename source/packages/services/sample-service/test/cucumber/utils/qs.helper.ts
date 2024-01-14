export class QSHelper {
  public static getQueryParams(queryString: string): any[] {
    if (queryString === '___null___' || queryString === '___undefined___') {
      return [];
    } else {
      let queryParams = queryString.split('?')[1];
      if (queryParams === undefined) {
        queryParams = queryString.split('?')[0]
      }
      const params = queryParams.split('&');

      let pair: string[] = [];
      const data: any[] = [];

      params.forEach(function (d) {
        pair = d.split('=') as string[];
        data.push({
          key: pair[0],
          value: pair[1]
        });
      });
      return data;
    }
  }
}