import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FilterByBoundary = (props) => {
  const { filterByAreaType, geo } = props;

  return (
    <ul className="filter-by-boundary filter-list">
      <li>
        <FilterButton
          filterName={'Citywide'}
          btnVal={geo === 'Citywide'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Borough'}
          btnVal={geo === 'Borough'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Community Board'}
          btnVal={geo === 'Community Board'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'City Council District'}
          btnVal={geo === 'City Council District'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Neighborhood (NTA)'}
          btnVal={geo === 'Neighborhood (NTA)'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'NYPD Precinct'}
          btnVal={geo === 'NYPD Precinct'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Zipcode (ZCTA)'}
          btnVal={geo === 'Zipcode (ZCTA)'}
          callback={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Custom'}
          btnVal={geo === 'Custom'}
          callback={filterByAreaType}
        />
      </li>
    </ul>
  );
};

FilterByBoundary.propTypes = {
  filterByAreaType: PropTypes.func.isRequired,
  geo: PropTypes.string.isRequired,
};

export default FilterByBoundary;
