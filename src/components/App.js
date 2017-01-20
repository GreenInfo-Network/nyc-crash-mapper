import React from 'react';

import AppHeader from './AppHeader';
import ZoomControls from './ZoomControls';
import LeafletMap from './LeafletMap';
import StatsLegend from './StatsLegend/';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';

export default () => (
  <div className="App">
    <AppHeader />
    <ZoomControls />
    <LeafletMap />
    <StatsLegend />
    <OptionsFiltersConnected />
  </div>
);
