const convertToString = (value: string | number | Date | boolean): string => {
  if (value instanceof Date) return encodeURIComponent(value.toISOString());
  return encodeURIComponent(value.toString());
}

const templateRegEx = /\\{.+\\}/gm

type ParamValues = string | number | Date | undefined | null | boolean;
export default class UrlBuilder {
  private readonly routeParams: { [i: string]: string };
  private readonly queryParams: { [i: string]: string };

  constructor(private baseUrl: string = '') {
    this.routeParams = {};
    this.queryParams = {};
  }

  addQueryParam(key: string, value: ParamValues | ParamValues[]): UrlBuilder {
    if (value == null) return this;
    if (Array.isArray(value)) return this.addArrayValues(value, key);
    this.queryParams[key] = convertToString(value);
    return this;
  }

  private addArrayValues(value: ParamValues[], key: string): UrlBuilder {
    (value as ParamValues[]).forEach((item: ParamValues, index: number) => {
      if (item == null) return;
      this.queryParams[`${key}[${index}]`] = convertToString(item);
    });
    return this;
  }

  addRouteParam(key: string, value: ParamValues): UrlBuilder {
    if (value == null) return this;
    this.routeParams[key] = convertToString(value);
    return this;
  }

  build(): string {
    const route = this.populateRouteParams();
    if (route.indexOf('?') === -1) return `${route}?${(this.getQueryParams())}`;
    return `${route}&${(this.getQueryParams())}`;
  }

  private getQueryParams(): string {
    const keys = Object.keys(this.queryParams);
    return keys.reduce((acc: string[], key: string) => {
      return acc.concat(`${key}=${this.queryParams[key]}`);
    }, []).join('&');
  }

  private populateRouteParams(): string {
    const keys = Object.keys(this.routeParams);
    const route = keys.reduce((acc: string, key: string) => {
      return acc.replace(`{${key}}`, this.routeParams[key])
    }, this.baseUrl);
    if (templateRegEx.test(route)) {
      throw new Error(`Route still contains template params: ${route}`);
    }
    return route;
  }
}
