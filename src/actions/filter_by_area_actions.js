import { FILTER_BY_AREA } from '../constants/action_types';

export default (area = 'CITYWIDE', latLons = []) => ({
  type: FILTER_BY_AREA,
  area,
  latLons
});
