import { DataFetchStatus } from '../../../models/noob-types';
import { IState } from '../../../backend/services/database/repositories/state-repository';
import { ICountry } from '../../../backend/services/database/repositories/country-repository';

export interface ICountryState {
  countries: ICountry[];
  countryFetchStatus: DataFetchStatus;
  states: IState[];
  stateFetchStatus: DataFetchStatus;
  error: any;
}
