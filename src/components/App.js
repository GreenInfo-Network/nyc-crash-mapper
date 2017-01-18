import React from 'react';

import AppHeader from './AppHeader';
import ZoomControls from './ZoomControls';
import LeafletMap from './LeafletMap';
import StatsLegend from './StatsLegend';
import OptionsFilters from './OptionsFilters';

export default () => (
  <div className="App">
    <AppHeader />
    <ZoomControls />
    <LeafletMap />
    <StatsLegend />
    <OptionsFilters />
  </div>
);
