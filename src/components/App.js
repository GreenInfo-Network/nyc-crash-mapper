import React from 'react';

import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegend from './StatsLegend/';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';

export default () => (
  <div className="App">
    <AppHeader />
    <LeafletMapConnected />
    <StatsLegend />
    <OptionsFiltersConnected />
  </div>
);
