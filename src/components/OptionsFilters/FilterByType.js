import React from 'react';

import FilterButton from './FilterButton';

const FilterByType = () => {
  // TO DO: replace noops with actual function calls
  const noop = () => {};

  return (
    <div className="filter-by-type">
      <ul className="filter-list">
        <li>
          <FilterButton
            filterName={'Cyclist'}
            callback={noop}
            btnType={'narrow'}
          />
        </li>
        <li>
          <FilterButton
            filterName={'Motorist'}
            callback={noop}
            btnType={'narrow'}
          />
        </li>
        <li>
          <FilterButton
            filterName={'Pedestrian'}
            callback={noop}
            btnType={'narrow'}
          />
        </li>
      </ul>
      <ul className="filter-list">
        <li>
          <FilterButton
            filterName={'Fatality'}
            callback={noop}
            btnType={'narrow'}
          />
        </li>
        <li>
          <FilterButton
            filterName={'Injury'}
            callback={noop}
            btnType={'narrow'}
          />
        </li>
        <li>
          <FilterButton
            filterName={'No Inj/Fat'}
            callback={noop}
            btnType={'narrow'}
          />
        </li>
      </ul>
    </div>
  );
};

export default FilterByType;
