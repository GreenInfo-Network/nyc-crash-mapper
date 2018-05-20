import { connect } from 'react-redux';

import {
  fetchSearchResults,
  updateAutosuggestValue,
  clearSearchSuggestions,
  selectSearchResult,
  resetLocationSearch,
} from '../actions';

import Search from '../components/Search';

const mapStateToProps = ({
  search: { error, isFetching, suggestions, autosuggestValue, selectedFeature }
}) => ({
  error,
  isFetching,
  autosuggestValue,
  suggestions,
  selectedFeature
});

export default connect(mapStateToProps, {
  fetchSearchResults,
  updateAutosuggestValue,
  clearSearchSuggestions,
  selectSearchResult,
  resetLocationSearch,
})(Search);
