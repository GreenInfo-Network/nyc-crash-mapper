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
              filterName={'cyclist fatality'}
              callback={filterByTypeFatality}
              btnType={'med'}
              btnVal={fatality.cyclist}
            />
          </li>
          <li>
            <FilterButton
              filterName={'motorist fatality'}
              callback={filterByTypeFatality}
              btnType={'med'}
              btnVal={fatality.motorist}
            />
          </li>
          <li>
            <FilterButton
              filterName={'pedestrian fatality'}
              callback={filterByTypeFatality}
              btnType={'med'}
              btnVal={fatality.pedestrian}
            />
            <FilterButton
              filterName={'No Injury / Fatality'}
              callback={filterByNoInjFat}
              btnType={'med'}
              btnVal={noInjuryFatality}
            />
          </li>
        </ul>
        <ul className="filter-list">
          <li>
            <FilterButton
              filterName={'cyclist injury'}
              callback={filterByTypeInjury}
              btnType={'med'}
              btnVal={injury.cyclist}
            />
          </li>
          <li>
            <FilterButton
              filterName={'motorist injury'}
              callback={filterByTypeInjury}
              btnType={'med'}
              btnVal={injury.motorist}
            />
          </li>
          <li>
            <FilterButton
              filterName={'pedestrian injury'}
              callback={filterByTypeInjury}
              btnType={'med'}
              btnVal={injury.pedestrian}
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
