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
          <p>None</p>
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
                <title>8 or more crashes</title>
              </circle>
              <text className="label" transform="translate(15.5,5)">{'> 8'}</text>
            </g>
            <g className="cell" transform="translate(0, 54.33333396911621)">
              <circle className="swatch" r="9.666666666666666" style={{ r: '9.66667px' }}>
                <title>5 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(24.5,5)">5</text>
            </g>
            <g className="cell" transform="translate(0, 78.00000095367432)">
              <circle className="swatch" r="6.833333333333333" style={{ r: '6.83333px' }}>
                <title>3 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(24.5,5)">3</text>
            </g>
            <g className="cell" transform="translate(0, 96.00000095367432)">
              <circle className="swatch" r="4" style={{ r: '4px' }}>
                <title>2 or fewer crashes</title>
              </circle>
              <text className="label" transform="translate(13.5,5)">{'<=2'}</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
);
