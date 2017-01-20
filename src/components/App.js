import React from 'react';

import AppHeader from './AppHeader';
import LeafletMap from './LeafletMap/';
import StatsLegend from './StatsLegend/';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';

export default () => (
  <div className="App">
    <AppHeader />
    <LeafletMap />
    <StatsLegend />
    <OptionsFiltersConnected />
  </div>
);
