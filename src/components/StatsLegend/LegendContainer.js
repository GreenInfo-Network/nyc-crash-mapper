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
      <ul>
        <li className="count-4-plus">
          <span />
          <p>4+</p>
        </li>
        <li className="count-3">
          <span />
          <p>3</p>
        </li>
        <li className="count-2">
          <span />
          <p>2</p>
        </li>
        <li className="count-1">
          <span />
          <p>1</p>
        </li>
      </ul>
    </div>
  </div>
);
