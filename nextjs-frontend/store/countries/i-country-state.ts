import { CountryResponse } from '../../service-clients/country-service/country-response';
import { StateResponse } from '../../service-clients/country-service/state-response';
import { DataFetchStatus } from '../../models/noob-types';

export interface ICountryState {
  countries: CountryResponse[];
  countryFetchStatus: DataFetchStatus;
  states: StateResponse[];
  stateFetchStatus: DataFetchStatus;
  error: any;
}
