import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

class FilterButton extends Component {
  constructor() {
    super();

    this.state = {
      active: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({ active: !prevState.active }));
    this.props.callback();
  }

  render() {
    const { filterName, btnType } = this.props;
    const { active } = this.state;

    const btnClasses = cx(btnType, {
      'filter-options-button': true,
      'roboto-medium': true,
      active
    });

    return (
      <button
        className={btnClasses}
        onClick={this.handleClick}
      >
        { filterName }
      </button>
    );
  }
}

FilterButton.defaultProps = {
  btnType: 'wide'
};

FilterButton.propTypes = {
  btnType: PropTypes.string,
  filterName: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default FilterButton;
