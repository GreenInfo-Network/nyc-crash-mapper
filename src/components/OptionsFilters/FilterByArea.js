import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FilterByBoundary = (props) => {
  const { filterByAreaType, geo } = props;

  return (
    <ul className="filter-by-boundary filter-list">
      <li>
        <FilterButton
          label={'Citywide'}
          id={'Citywide'}
          isActive={geo === 'Citywide'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'Borough'}
          id={'Borough'}
          isActive={geo === 'Borough'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'Community Board'}
          id={'Community Board'}
          isActive={geo === 'Community Board'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'City Council District'}
          id={'City Council District'}
          isActive={geo === 'City Council District'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'Neighborhood (NTA)'}
          id={'Neighborhood (NTA)'}
          isActive={geo === 'Neighborhood (NTA)'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'NYPD Precinct'}
          id={'NYPD Precinct'}
          isActive={geo === 'NYPD Precinct'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'Zipcode (ZCTA)'}
          id={'Zipcode (ZCTA)'}
          isActive={geo === 'Zipcode (ZCTA)'}
          handleClick={filterByAreaType}
        />
      </li>
      <li>
        <FilterButton
          label={'Custom'}
          id={'Custom'}
          isActive={geo === 'Custom'}
          handleClick={filterByAreaType}
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
