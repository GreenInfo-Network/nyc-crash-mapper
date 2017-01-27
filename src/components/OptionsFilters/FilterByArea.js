import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FilterByBoundary = (props) => {
  const { filterByArea, geo } = props;

  return (
    <ul className="filter-by-boundary filter-list">
      <li>
        <FilterButton
          filterName={'Citywide'}
          btnVal={geo === 'Citywide'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Borough'}
          btnVal={geo === 'Borough'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Community Board'}
          btnVal={geo === 'Community Board'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'City Council District'}
          btnVal={geo === 'City Council District'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Neighborhood (NTA)'}
          btnVal={geo === 'Neighborhood (NTA)'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'NYPD Precinct'}
          btnVal={geo === 'NYPD Precinct'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Zipcode (ZCTA)'}
          btnVal={geo === 'Zipcode (ZCTA)'}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Custom'}
          btnVal={geo === 'Custom'}
          callback={filterByArea}
        />
      </li>
    </ul>
  );
};

FilterByBoundary.propTypes = {
  filterByArea: PropTypes.func.isRequired,
  geo: PropTypes.string.isRequired,
};

export default FilterByBoundary;
