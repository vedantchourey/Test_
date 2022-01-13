import { DataFetchStatus } from '../../../models/noob-types';
import { IState } from '../../../backend/services/database/models/i-state';

export interface ICountryState {
  states: IState[];
  stateFetchStatus: DataFetchStatus;
  error: any;
}
