import React from 'react';

// Renders the nav menu items in the header
const Menu = () => {
  const hostname = process.env.NODE_ENV === 'production'
    ? 'greeninfo-network.github.io'
    : 'localhost:8889';

  const items = [
    { type: '', value: 'map', label: 'Map' },
    { type: 'link', value: 'trend', label: 'Trend' },
    { type: 'link', value: 'compare', label: 'Compare' },
    { type: 'link', value: 'rank', label: 'Rank' },
    { type: '', value: 'about', label: 'About' },
  ];
  const chartView = 'map';

  const mapTypeToElement = (item) => {
    const { type } = item;
    const className = chartView === item.value ? 'active' : null;

    switch (type) {
      case 'link':
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`http://${hostname}?view=${item.value}`}
            className={className}
          >
            {item.label}
          </a>
        );

      // case 'view':
      //   return (
      //     <button className={className} onClick={() => handleViewClick(item.value)}>
      //       {item.label}
      //     </button>
      //   );

      // TO DO: implement "About"
      default:
        return <button className={className} onClick={() => {}}>{item.label}</button>;
    }
  };

  return (
    <ul className="Menu">
      {items.map(item => <li key={item.label}>{mapTypeToElement(item)}</li>)}
    </ul>
  );
};

export default Menu;
