import { CountryResponse } from '../../service-clients/country-service/CountryResponse';
import { StateResponse } from '../../service-clients/country-service/StateResponse';
import { DataFetchStatus } from '../DataFetchStatus';

export interface ICountryState {
  countries: CountryResponse[];
  countryFetchStatus: DataFetchStatus;
  states: StateResponse[];
  stateFetchStatus: DataFetchStatus;
  error: any;
}
