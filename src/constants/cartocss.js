/* @flow */
import sls from 'single-line-string';
import { cartoTables } from './app_config';

const crashesTable = cartoTables.nyc_crashes;

// CartoCSS to style crash data in Leaflet map
const cartocss: string = sls`
  /* color values match those ./scss/_variables.scss */
  @fatality: #f03b20;
  @injury: #fd8d3c;
  @nofatinj: #fecc5c;

  #${crashesTable} {
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

    #${crashesTable} [ total_crashes > 67] {
       marker-width: 25;
    }
    #${crashesTable} [ total_crashes <= 67] {
       marker-width: 23;
    }
    #${crashesTable} [ total_crashes <= 60] {
       marker-width: 21;
    }
    #${crashesTable} [ total_crashes <= 53] {
       marker-width: 19;
    }
    #${crashesTable} [ total_crashes <= 46] {
       marker-width: 17;
    }
    #${crashesTable} [ total_crashes <= 39] {
       marker-width: 15.5;
    }
    #${crashesTable} [ total_crashes <= 32] {
       marker-width: 14;
    }
    #${crashesTable} [ total_crashes <= 25] {
       marker-width: 12;
    }
    #${crashesTable} [ total_crashes <= 18] {
       marker-width: 10;
    }
    #${crashesTable} [ total_crashes <= 11] {
       marker-width: 8;
    }
  }
`;

// CartoCSS for the Filter by Boundary polygons
export const filterAreaCartocss = (layer: string): string => sls`
  /* color values match those ./scss/_variables.scss */
  @marine: #105b63;

  #${layer} {
    polygon-fill: lighten(@marine, 10);
    polygon-opacity: 0.7;
    line-color: #fff;
    line-width: 1;
    line-opacity: 1;
  }"
`;

export default cartocss;
