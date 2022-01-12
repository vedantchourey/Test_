import { DataFetchStatus } from '../../../models/noob-types';
import { ICountry } from '../../../backend/services/database/models/i-country';
import { IState } from '../../../backend/services/database/models/i-state';

export interface ICountryState {
  countries: ICountry[];
  countryFetchStatus: DataFetchStatus;
  states: IState[];
  stateFetchStatus: DataFetchStatus;
  error: any;
}
