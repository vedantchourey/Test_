import { CountryResponse } from '../../service-clients/country-service/country-response';
import { DataFetchStatus } from '../../models/noob-types';
import { IState } from '../../services/backend-services/database/repositories/state-repository';

export interface ICountryState {
  countries: CountryResponse[];
  countryFetchStatus: DataFetchStatus;
  states: IState[];
  stateFetchStatus: DataFetchStatus;
  error: any;
}
