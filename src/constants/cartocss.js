import sls from 'single-line-string';

export default sls`
  /** simple visualization */
  @fatality: #f03b20;
  @injury: #fd8d3c;
  @nofatinj: #fecc5c;

  #table_20k_crashes {
    marker-fill-opacity: 0.9;
    marker-line-color: #FFFAD5;
    marker-line-width: 0.7;
    marker-line-opacity: 1;
    marker-placement: point;
    marker-type: ellipse;
    marker-width: 8;
    marker-fill: @nofatinj;
    marker-allow-overlap: true;

    [persons_injured > 0] {
      marker-fill: @injury;
    }

    [persons_killed > 0] {
      marker-fill: @fatality;
    }
  }
`;
