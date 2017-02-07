import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FilterByBoundary = (props) => {
  const { filterByAreaType, toggleCustomAreaDraw, drawEnabeled, geo, identifier } = props;

  const boroughLookUp = {
    1: 'Manhattan',
    2: 'Bronx',
    3: 'Brooklyn',
    4: 'Queens',
    5: 'Staten Island',
  };

  const showIdentifier = (name) => {
    if (geo === name && identifier) {
      let label = name === 'Borough' ? boroughLookUp[identifier] : identifier;

      if (label.length > 16) {
        label = `${label.substring(0, 16)}...`;
      }

      return (
        <span style={{ marginLeft: '10px', fontSize: '11px' }}>
          {label}
        </span>
      );
    }
    return null;
  };

  return (
    <ul className="filter-by-boundary filter-list">
      <li>
        <FilterButton
          label={'Citywide'}
          id={'Citywide'}
          isActive={geo === 'Citywide'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
      </li>
      <li>
        <FilterButton
          label={'Borough'}
          id={'Borough'}
          isActive={geo === 'Borough'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('Borough') }
      </li>
      <li>
        <FilterButton
          label={'Community Board'}
          id={'Community Board'}
          isActive={geo === 'Community Board'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('Community Board') }
      </li>
      <li>
        <FilterButton
          label={'City Council District'}
          id={'City Council District'}
          isActive={geo === 'City Council District'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('City Council District') }
      </li>
      <li>
        <FilterButton
          label={'Neighborhood (NTA)'}
          id={'Neighborhood (NTA)'}
          isActive={geo === 'Neighborhood (NTA)'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('Neighborhood (NTA)') }
      </li>
      <li>
        <FilterButton
          label={'NYPD Precinct'}
          id={'NYPD Precinct'}
          isActive={geo === 'NYPD Precinct'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('NYPD Precinct') }
      </li>
      <li>
        <FilterButton
          label={'Zipcode (ZCTA)'}
          id={'Zipcode (ZCTA)'}
          isActive={geo === 'Zipcode (ZCTA)'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('Zipcode (ZCTA)') }
      </li>
      <li>
        <FilterButton
          label={'Custom'}
          id={'Custom'}
          isActive={geo === 'Custom'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { geo === 'Custom' && !drawEnabeled ?
          <button className="draw-again" onClick={() => toggleCustomAreaDraw()}>
            Draw Again
          </button> : null
        }
        { geo === 'Custom' && drawEnabeled ?
          <button className="cancel-drawing" onClick={() => toggleCustomAreaDraw()}>
            Cancel Draw
          </button> : null
        }
      </li>
    </ul>
  );
};

FilterByBoundary.defaultProps = {
  identifier: '',
  lngLats: [],
};

FilterByBoundary.propTypes = {
  filterByAreaType: PropTypes.func.isRequired,
  toggleCustomAreaDraw: PropTypes.func.isRequired,
  drawEnabeled: PropTypes.bool.isRequired,
  geo: PropTypes.string.isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

export default FilterByBoundary;
