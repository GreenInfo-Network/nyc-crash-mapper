import React from 'react';

import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegendConnected from '../containers/StatsLegendConnected';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';

export default () => (
  <div className="App">
    <AppHeader />
    <LeafletMapConnected />
    <StatsLegendConnected />
    <OptionsFiltersConnected />
  </div>
);
