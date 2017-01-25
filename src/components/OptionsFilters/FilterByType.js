import React, { PropTypes, Component } from 'react';

import FilterButton from './FilterButton';

class FilterByType extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { filterByTypeHarm, filterByTypePersona, harm, persona } = this.props;

    return (
      <div className="filter-by-type">
        <ul className="filter-list">
          <li>
            <FilterButton
              filterName={'Cyclist'}
              callback={filterByTypePersona}
              btnType={'narrow'}
              btnVal={persona}
            />
          </li>
          <li>
            <FilterButton
              filterName={'Motorist'}
              callback={filterByTypePersona}
              btnType={'narrow'}
              btnVal={persona}
            />
          </li>
          <li>
            <FilterButton
              filterName={'Pedestrian'}
              callback={filterByTypePersona}
              btnType={'narrow'}
              btnVal={persona}
            />
          </li>
        </ul>
        <ul className="filter-list">
          <li>
            <FilterButton
              filterName={'Fatality'}
              callback={filterByTypeHarm}
              btnType={'narrow'}
              btnVal={harm}
            />
          </li>
          <li>
            <FilterButton
              filterName={'Injury'}
              callback={filterByTypeHarm}
              btnType={'narrow'}
              btnVal={harm}
            />
          </li>
          <li>
            <FilterButton
              filterName={'No Inj/Fat'}
              callback={filterByTypeHarm}
              btnType={'narrow'}
              btnVal={harm}
            />
          </li>
        </ul>
      </div>
    );
  }
}

FilterByType.propTypes = {
  filterByTypePersona: PropTypes.func.isRequired,
  filterByTypeHarm: PropTypes.func.isRequired,
  harm: PropTypes.string.isRequired,
  persona: PropTypes.string.isRequired
};

export default FilterByType;
