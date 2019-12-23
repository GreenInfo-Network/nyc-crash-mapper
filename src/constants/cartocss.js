import sls from 'single-line-string';

// for some reason importing this val from './app_config' isn't working...
const nyc_crashes = 'export2016_07';

const cartocss = sls`
  /* color values match those ./scss/_variables.scss */
  @fatality: #f03b20;
  @injury: #fd8d3c;
  @nofatinj: #fecc5c;

  #${nyc_crashes} {
    marker-fill-opacity: 0.9;
    marker-line-color: #FFFAD5;
    marker-line-width: 0.7;
    marker-line-opacity: 1;
    marker-placement: point;
    marker-type: ellipse;
    marker-width: 8;
    marker-fill: @nofatinj;
    marker-allow-overlap: true;

    /* sometimes the data will have pedestrain marked as injured but
     also have persons_injured = 0 (WTF data!!!) */
    [persons_injured > 0],
    [cyclist_injured > 0],
    [pedestrian_injured > 0],
    [motorist_injured > 0] {
      marker-fill: @injury;
    }

    /* same goes for number_of_x_killed */
    [persons_killed > 0],
    [cyclist_killed > 0],
    [pedestrian_killed > 0],
    [motorist_killed > 0] {
      marker-fill: @fatality;
    }

    #${nyc_crashes} [ total_crashes > 8] {
       marker-width: 24;
    }
    #${nyc_crashes} [ total_crashes <= 5] {
       marker-width: 20;
    }
    #${nyc_crashes} [ total_crashes <= 3] {
       marker-width: 16;
    }
    #${nyc_crashes} [ total_crashes <= 2] {
       marker-width: 12;
    }
    #${nyc_crashes} [ total_crashes <= 1] {
       marker-width: 8;
    }
  }
`;

export default cartocss;
