import React, { Component, PropTypes } from 'react';

import OptionsContainer from './OptionsContainer';
import FilterByBoundary from './FilterByBoundary';
import FilterByType from './FilterByType';

class OptionsFilters extends Component {
  constructor() {
    super();
    this.state = {
      opened: true
    };
  }

  render() {
    // TO DO: make component collapse to bottom of window instead of top
    // const { innerHeight } = this.props;

    return (
      <div className="ui right app-options-filters">
        <OptionsContainer title={'MAP OPTIONS'} ruledLine>
          <OptionsContainer title={'Filter by Boundary'}>
            <FilterByBoundary />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Type'}>
            <FilterByType />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Date Range'}>
            <p>to do...</p>
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Data'}>
            <p>to do...</p>
          </OptionsContainer>
          <hr />
        </OptionsContainer>
        <OptionsContainer title={'Share'}>
          <p>to do...</p>
        </OptionsContainer>
        <hr />
        <p style={{ fontSize: 11 }}>{'Disclaimer | About | Copyright'}</p>
      </div>
    );
  }
}

OptionsFilters.defaultProps = {
  innerHeight: 0
};
OptionsFilters.propTypes = {
  innerHeight: PropTypes.number
};

export default OptionsFilters;
