// Flow types for Components

// Flow types for 3rd party libraries
import type Moment from 'moment';

// Filter by Type personTypes
export type PersonTypes = {
  cyclist: boolean;
  motorist: boolean;
  pedestrian: boolean
};

// Filter by (crash) Type
export type FilterType = {
  injury: PersonTypes;
  fatality: PersonTypes;
  noInjuryFatality: boolean
};

// longitude latitude tuple
export type LngLat = [number, number];

// params object passed to some fetch function calls
// also used as Props type in other places
export type Params = {
  geo: string;
  startDate: Moment;
  endDate: Moment;
  lngLats: Array<LngLat>;
  filterType: FilterType;
  identifier: string
};

// props received by App component
export type AppProps = {
  fetchContributingFactors: (params: Params) => Promise<any>,
  fetchCrashesDateRange: () => Promise<any>,
  fetchCrashStatsData: (params: Params) => Promise<any>,
  fetchCrashesMaxDate: () => Promise<any>,
  fetchCrashesYearRange: () => Promise<any>,
  openModal: () => void,
  location: Object,
  startDate: Moment,
  endDate: Moment,
  filterType: FilterType,
  identifier: string,
  geo: string,
  lngLats: Array<LngLat>,
  height: number,
  width: number,
};
