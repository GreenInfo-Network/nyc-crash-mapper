import React from 'react';

export default () => (
  <div className="legend-container">
    <div className="legend-crash-types">
      <ul>
        <li>
          <span className="type-fatality" />
          <p>Fatality</p>
        </li>
        <li>
          <span className="type-injury" />
          <p>Injury</p>
        </li>
        <li>
          <span className="type-no-inj-fat" />
          <p>No Inj/Fat</p>
        </li>
      </ul>
    </div>
    <div className="legend-crash-count">
      {/*
        generated using https://github.com/susielu/d3-legend
        https://bl.ocks.org/clhenrick/ba0e4795ec2c273ef366a78911e1e2d7
        */}
      <svg>
        <g transform="translate(20, 0)">
          <g className="legendCells">
            <g className="cell" transform="translate(0, 25)">
              <circle className="swatch" r="12.5" style={{ r: '12.5px' }}>
                <title>74 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(17.5,5)">74</text>
            </g>
            <g className="cell" transform="translate(0, 54.33333396911621)">
              <circle className="swatch" r="9.666666666666666" style={{ r: '9.66667px' }}>
                <title>46 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(17.5,5)">53</text>
            </g>
            <g className="cell" transform="translate(0, 78.00000095367432)">
              <circle className="swatch" r="6.833333333333333" style={{ r: '6.83333px' }}>
                <title>32 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(17.5,5)">32</text>
            </g>
            <g className="cell" transform="translate(0, 96.00000095367432)">
              <circle className="swatch" r="4" style={{ r: '4px' }}>
                <title>11 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(17.5,5)">11</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
);
