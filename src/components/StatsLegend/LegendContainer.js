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
        <li title="74 or fewer crashes" className="count-size-4">
          <span />
          <p>{'<=74'}</p>
        </li>
        <li title="46 or fewer crashes" className="count-size-3">
          <span />
          <p>{'<=46'}</p>
        </li>
        <li title="32 or fewer crashes" className="count-size-2">
          <span />
          <p>{'<=32'}</p>
        </li>
        <li title="11 or fewer crashes" className="count-size-1">
          <span />
          <p>{'<=11'}</p>
        </li>
      </ul>
    </div>
  </div>
);
