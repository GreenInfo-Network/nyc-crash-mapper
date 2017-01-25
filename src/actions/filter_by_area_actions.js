import { FILTER_BY_AREA } from '../constants/action_types';

export default (geo = 'CITYWIDE', latLons = []) => ({
  type: FILTER_BY_AREA,
  geo,
  latLons
});
