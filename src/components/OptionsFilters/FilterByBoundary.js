import React from 'react';

import FilterButton from './FilterButton';

const FilterByBoundary = () => {
  // TO DO: replace noops with actual function calls
  const noop = () => {};

  return (
    <ul className="filter-by-boundary">
      <li>
        <FilterButton filterName={'Citywide'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'Borough'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'Community Board'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'City Council District'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'Neighborhood (NTA)'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'NYPD Precinct'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'Zipcode (ZCTA)'} callback={noop} />
      </li>
      <li>
        <FilterButton filterName={'Custom'} callback={noop} />
      </li>
    </ul>
  );
};

export default FilterByBoundary;
