import React, { Component, PropTypes } from 'react';

import OptionsContainer from './OptionsContainer';
import FilterByArea from '../../containers/FilterByAreaConnected';
import FilterByType from '../../containers/FilterByTypeConnected';
import FilterByDate from '../../containers/FilterByDateConnected';
import DownloadData from './DownloadData';
import ShareOptions from './ShareOptions';
import FooterOptions from './FooterOptions';

class OptionsFilters extends Component {
  render() {
    const { height, maxDate, openModal } = this.props;

    return (
      <div className="ui right app-options-filters">
        <OptionsContainer
          title={'MAP OPTIONS'}
          collapseHeight={height - 120 - 45}
          className="no-padding-bottom"
          ruledLine
          scroll
        >
          <OptionsContainer title={'Filter by Date Range'}>
            <FilterByDate />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Boundary'}>
            <FilterByArea />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Filter by Type'}>
            <FilterByType />
          </OptionsContainer>
          <hr />
          <OptionsContainer title={'Data'} isOpened={false}>
            <DownloadData
              openModal={openModal}
              lastUpdated={maxDate}
            />
          </OptionsContainer>
        </OptionsContainer>
        <hr />
        <OptionsContainer
          title={'Share'}
          className="no-padding-bottom"
          collapsable={false}
          optionsContainerHeight={93}
        >
          <ShareOptions openModal={openModal} />
        </OptionsContainer>
        <FooterOptions openModal={openModal} />
      </div>
    );
  }
}

OptionsFilters.defaultProps = {
  maxDate: '',
  height: 120
};

OptionsFilters.propTypes = {
  maxDate: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  height: PropTypes.number
};

export default OptionsFilters;
