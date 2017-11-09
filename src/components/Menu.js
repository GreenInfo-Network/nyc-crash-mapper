import React, { PropTypes } from 'react';
import qs from 'query-string';

// Renders the nav menu items in the header
const Menu = (props) => {
  const { openModal, ...rest } = props;
  const queryString = qs.stringify(rest);

  const hostname = process.env.NODE_ENV === 'production'
    ? 'greeninfo-network.github.io'
    : 'localhost:8889';

  const items = [
    { type: null, value: 'map', label: 'Map' },
    { type: 'link', value: 'trend', label: 'Trend' },
    { type: 'link', value: 'compare', label: 'Compare' },
    { type: 'link', value: 'rank', label: 'Rank' },
    { type: 'modal', value: 'about', label: 'About' },
  ];

  const mapTypeToElement = (item) => {
    const { label, type, value } = item;

    switch (type) {
      case 'link':
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${hostname}?view=${value}&${queryString}`}
          >
            {label}
          </a>
        );

      case 'modal':
        return (
          <button onClick={() => openModal(value)}>
            {label}
          </button>
        );

      // TO DO: implement "About"
      default:
        return (
          <button
            className={value === 'map' ? 'active' : null}
            onClick={() => {}}
          >
            {item.label}
          </button>
        );
    }
  };

  return (
    <ul className="Menu">
      {items.map(item => <li key={item.label}>{mapTypeToElement(item)}</li>)}
    </ul>
  );
};

Menu.propTypes = {
  openModal: PropTypes.func.isRequired,
  p1start: PropTypes.string.isRequired,
  p1end: PropTypes.string.isRequired,
  geo: PropTypes.string.isRequired,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  pinj: PropTypes.bool.isRequired,
  pfat: PropTypes.bool.isRequired,
  cinj: PropTypes.bool.isRequired,
  cfat: PropTypes.bool.isRequired,
  minj: PropTypes.bool.isRequired,
  mfat: PropTypes.bool.isRequired,
};

Menu.defaultProps = {
  primary: null,
};

export default Menu;
