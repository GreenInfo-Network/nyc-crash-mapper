import React, { Component, PropTypes } from 'react';

import OptionsContainer from './OptionsContainer';
import FilterByBoundary from './FilterByBoundary';
import FilterByType from './FilterByType';
import FilterByDate from './FilterByDate';
import DownloadData from './DownloadData';
import ShareOptions from './ShareOptions';
import FooterOptions from './FooterOptions';

class OptionsFilters extends Component {
  render() {
    // TO DO: make component collapse to bottom of window instead of top
    const { height } = this.props;

    return (
      <div className="ui right app-options-filters">
        <OptionsContainer
          title={'MAP OPTIONS'}
          collapseHeight={height - 117 - 45}
          className="no-padding-bottom"
          ruledLine
          scroll
        >
          <OptionsContainer title={'Filter by Boundary'}>
            <FilterByBoundary />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Type'}>
            <FilterByType />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Date Range'}>
            <FilterByDate />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Data'}>
            <DownloadData lastUpdated="12/31/2016" />
          </OptionsContainer>
        </OptionsContainer>
        <hr />
        <OptionsContainer
          title={'Share'}
          className="no-padding-bottom"
          collapsable={false}
        >
          <ShareOptions />
        </OptionsContainer>
        <FooterOptions />
      </div>
    );
  }
}

OptionsFilters.defaultProps = {
  height: 120
};
OptionsFilters.propTypes = {
  height: PropTypes.number
};

export default OptionsFilters;
