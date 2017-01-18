import React, { Component } from 'react';

import OptionsContainer from './OptionsContainer';
import FilterByBoundary from './FilterByBoundary';

class OptionsFilters extends Component {
  constructor() {
    super();
    this.state = {
      opened: true
    };
  }

  render() {
    // TO DO: make component collapse to bottom of window instead of top
    return (
      <div className="ui right app-options-filters">
        <OptionsContainer title={'MAP OPTIONS'} ruledLine={true}>
          <OptionsContainer title={'Filter by Boundary'}>
            <FilterByBoundary />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Type'}>
            <p>to do...</p>
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

OptionsFilters.defaultProps = {};
OptionsFilters.propTypes = {};

export default OptionsFilters;
