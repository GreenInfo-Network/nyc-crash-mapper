import React, { PropTypes, Component } from 'react';

import FilterButton from './FilterButton';

class FilterByType extends Component {
  render() {
    const { filterByTypeFatality, filterByTypeInjury, filterByNoInjFat, injury,
      fatality, noInjuryFatality } = this.props;

    return (
      <div className="filter-by-type">
        <ul className="filter-list">
          <li>
            <FilterButton
              label={'cyclist fatality'}
              id={'cyclist'}
              handleClick={filterByTypeFatality}
              btnSize={'med'}
              isActive={fatality.cyclist}
            />
          </li>
          <li>
            <FilterButton
              label={'motorist fatality'}
              id={'motorist'}
              handleClick={filterByTypeFatality}
              btnSize={'med'}
              isActive={fatality.motorist}
            />
          </li>
          <li>
            <FilterButton
              label={'pedestrian fatality'}
              id={'pedestrian'}
              handleClick={filterByTypeFatality}
              btnSize={'med'}
              isActive={fatality.pedestrian}
            />
          </li>
          <li>
            <FilterButton
              label={'No Injury / Fatality'}
              id={''}
              handleClick={filterByNoInjFat}
              btnSize={'med'}
              isActive={noInjuryFatality}
            />
          </li>
        </ul>
        <ul className="filter-list">
          <li>
            <FilterButton
              label={'cyclist injury'}
              id={'cyclist'}
              handleClick={filterByTypeInjury}
              btnSize={'med'}
              isActive={injury.cyclist}
            />
          </li>
          <li>
            <FilterButton
              label={'motorist injury'}
              id={'motorist'}
              handleClick={filterByTypeInjury}
              btnSize={'med'}
              isActive={injury.motorist}
            />
          </li>
          <li>
            <FilterButton
              label={'pedestrian injury'}
              id={'pedestrian'}
              handleClick={filterByTypeInjury}
              btnSize={'med'}
              isActive={injury.pedestrian}
            />
          </li>
        </ul>
      </div>
    );
  }
}

FilterByType.propTypes = {
  filterByTypeInjury: PropTypes.func.isRequired,
  filterByTypeFatality: PropTypes.func.isRequired,
  filterByNoInjFat: PropTypes.func.isRequired,
  fatality: PropTypes.shape({
    cyclist: PropTypes.bool.isRequired,
    motorist: PropTypes.bool.isRequired,
    pedestrian: PropTypes.bool.isRequired,
  }).isRequired,
  injury: PropTypes.shape({
    cyclist: PropTypes.bool.isRequired,
    motorist: PropTypes.bool.isRequired,
    pedestrian: PropTypes.bool.isRequired,
  }).isRequired,
  noInjuryFatality: PropTypes.bool.isRequired
};

export default FilterByType;
