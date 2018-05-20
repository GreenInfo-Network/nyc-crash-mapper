import React, { PropTypes } from 'react';
import throttle from 'lodash/throttle';
import Autosuggest from 'react-autosuggest';

import SearchResults from './SearchResults';

// don't overwhelm the geocoding API
const THROTTLE_WAIT_MS = 200;

// TODO: implement filter by location
const noop = () => {};

const Search = ({
  autosuggestValue,
  suggestions,
  fetchSearchResults,
  updateAutosuggestValue,
  clearSearchSuggestions,
  selectSearchResult,
  resetLocationSearch,
  selectedFeature,
  error,
  isFetching
}) => {
  const onSuggestionsFetchRequested = () => {
    fetchSearchResults();
  };

  const onSuggestionsClearRequested = () => {
    clearSearchSuggestions();
  };

  const handleChange = (event, { newValue }) => {
    updateAutosuggestValue(newValue);
  };

  const onSuggestionSelected = () => {
    const result = suggestions.length ? suggestions[0] : null;
    selectSearchResult(result);
  };

  // eslint-disable-next-line
  const getSuggestionValue = suggestion =>
    suggestion && suggestion.properties && suggestion.properties.name
    ? suggestion.properties.name
    : null;

  // eslint-disable-next-line
  const renderSuggestion = feature =>
    feature && feature.properties && feature.properties.name ? (
      <span>{feature.properties.name}</span>
    ) : null;

  const inputProps = {
    placeholder: 'Search an NYC address...',
    value: autosuggestValue,
    onChange: handleChange
  };

  return (
    <div className="Search ui">
      <Autosuggest
        onSuggestionsFetchRequested={throttle(onSuggestionsFetchRequested, THROTTLE_WAIT_MS)}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {
        (selectedFeature || error) &&
          <SearchResults
            selectedFeature={selectedFeature}
            resetLocationSearch={resetLocationSearch}
            filterByLocation={noop}
            isFetching={isFetching}
            error={error}
          />
      }
    </div>
  );
};

Search.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  autosuggestValue: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  updateAutosuggestValue: PropTypes.func.isRequired,
  clearSearchSuggestions: PropTypes.func.isRequired,
  selectSearchResult: PropTypes.func.isRequired,
  resetLocationSearch: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    geometry: PropTypes.object,
    properties: PropTypes.object,
    type: PropTypes.string
  })
};

Search.defaultProps = {
  error: null,
  selectedFeature: null
};

export default Search;
