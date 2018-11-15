import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

import { labelFormats } from './../../constants/app_config';

const FilterByBoundary = (props) => {
  const { filterByAreaType, filterByAreaIdentifier, toggleCustomAreaDraw, drawEnabeled, geo,
    identifier } = props;

  const showIdentifier = (name) => {
    if (geo === name && identifier) {
      let label = identifier;
      if (geo === 'intersection') label = label.split('|')[0].split(', ')[1];

      const tooltip = labelFormats[geo].replace('{}', label);

      if (label.length > 12) {
        label = `${label.substring(0, 12)}...`;
      }

      return (
        <span>
          <p className="identifier-label" title={tooltip}>
            {label}
          </p>
          <button
            className="deselect-identifier"
            onClick={() => filterByAreaIdentifier(undefined)}
          >
            {'✕'}
          </button>
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
          id={'citywide'}
          isActive={geo === 'citywide'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
      </li>
      <li>
        <FilterButton
          label={'Borough'}
          id={'borough'}
          isActive={geo === 'borough'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('borough') }
      </li>
      <li>
        <FilterButton
          label={'Community Board'}
          id={'community_board'}
          isActive={geo === 'community_board'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('community_board') }
      </li>
      <li>
        <FilterButton
          label={'City Council District'}
          id={'city_council'}
          isActive={geo === 'city_council'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('city_council') }
      </li>
      <li>
        <FilterButton
          label={'Neighborhood (NTA)'}
          id={'neighborhood'}
          isActive={geo === 'neighborhood'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('neighborhood') }
      </li>
      <li>
        <FilterButton
          label={'NYPD Precinct'}
          id={'nypd_precinct'}
          isActive={geo === 'nypd_precinct'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('nypd_precinct') }
      </li>
      <li>
        <FilterButton
          label={'Assembly District'}
          id={'assembly'}
          isActive={geo === 'assembly'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('assembly') }
      </li>
      <li>
        <FilterButton
          label={'Senate District'}
          id={'senate'}
          isActive={geo === 'senate'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('senate') }
      </li>
      <li>
        <FilterButton
          label={'Intersection'}
          id={'intersection'}
          isActive={geo === 'intersection'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { showIdentifier('intersection') }
      </li>
      <li>
        <FilterButton
          label={'Custom'}
          id={'custom'}
          isActive={geo === 'custom'}
          handleClick={filterByAreaType}
          preventRetrigger
        />
        { geo === 'custom' && !drawEnabeled ?
          <button className="draw-again" onClick={() => toggleCustomAreaDraw()}>
            Draw Again
          </button> : null
        }
        { geo === 'custom' && drawEnabeled ?
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
  filterByAreaIdentifier: PropTypes.func.isRequired,
  toggleCustomAreaDraw: PropTypes.func.isRequired,
  drawEnabeled: PropTypes.bool.isRequired,
  geo: PropTypes.string.isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

export default FilterByBoundary;
