import React, { PropTypes } from 'react';

const ContributingFactorsList = (props) => {
  const { factors } = props;

  const factorsList = () =>
    factors.map(factor =>
      (<li key={factor.type}>
        <p>
          <span className="factor-count">{factor.count}</span>
          <span className="factor-type">{factor.type}</span>
        </p>
      </li>)
    );

  return (
    <div className="contributing-factors-list scroll">
      <ul>
        { factorsList() }
      </ul>
    </div>
  );
};

ContributingFactorsList.defaultProps = {
  factors: []
};

ContributingFactorsList.propTypes = {
  factors: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    type: PropTypes.string
  }))
};

export default ContributingFactorsList;
