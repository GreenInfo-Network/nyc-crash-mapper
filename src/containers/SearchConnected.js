import { connect } from 'react-redux';

import {
  fetchSearchResults,
  updateAutosuggestValue,
  clearSearchSuggestions,
  selectSearchResult,
} from '../actions';

import Search from '../components/Search';

const mapStateToProps = ({
  search: { error, isFetching, suggestions, autosuggestValue }
}) => ({
  error,
  isFetching,
  autosuggestValue,
  suggestions
});

export default connect(mapStateToProps, {
  fetchSearchResults,
  updateAutosuggestValue,
  clearSearchSuggestions,
  selectSearchResult,
})(Search);
