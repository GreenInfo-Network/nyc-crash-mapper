import {
  CONTRIBUTING_FACTORS_REQUEST,
  CONTRIBUTING_FACTORS_SUCCESS,
  CONTRIBUTING_FACTORS_ERROR,
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case CONTRIBUTING_FACTORS_REQUEST:
      return {
        ...state,
        _fetchingContributingFactors: true,
      };
    case CONTRIBUTING_FACTORS_SUCCESS:
      return {
        ...state,
        _fetchingContributingFactors: false,
        factors: action.json
      };
    case CONTRIBUTING_FACTORS_ERROR:
      return {
        ...state,
        _fetchingContributingFactors: false,
        error: action.error
      };
    default:
      return state;
  }
};
