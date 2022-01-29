import { DataFetchStatus } from '../../../models/noob-types';
import { IState } from '../../../backend/services/database/models/i-state';

export interface ICountryState {
  states: IState[];
  stateFetchStatus: DataFetchStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}
