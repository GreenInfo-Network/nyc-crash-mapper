import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FilterByBoundary = (props) => {
  const { filterByArea, geo } = props;

  return (
    <ul className="filter-by-boundary filter-list">
      <li>
        <FilterButton
          filterName={'Citywide'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Borough'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Community Board'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'City Council District'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Neighborhood (NTA)'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'NYPD Precinct'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Zipcode (ZCTA)'}
          btnVal={geo}
          callback={filterByArea}
        />
      </li>
      <li>
        <FilterButton
          filterName={'Custom'}
          btnVal={geo}
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
