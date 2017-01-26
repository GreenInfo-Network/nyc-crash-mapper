import React, { PropTypes } from 'react';

const ContributingFactorsList = (props) => {
  const { factors } = props;

  const factorsList = () =>
    factors.map((f) => {
      const { factor, count_factor } = f;

      return (
        <li key={factor}>
          <p>
            <span className="factor-count">
              {count_factor.toLocaleString()}
            </span>
            <span className="factor-type">
              {
                factor !== '' ? factor : 'None Recorded'
              }
            </span>
          </p>
        </li>);
    });

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
    count_factor: PropTypes.number,
    factor: PropTypes.string
  }))
};

export default ContributingFactorsList;
