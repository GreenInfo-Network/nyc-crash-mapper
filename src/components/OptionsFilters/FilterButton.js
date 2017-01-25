import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

class FilterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.btnVal === props.filterName
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.btnVal === this.props.filterName
    });
  }

  handleClick() {
    this.props.callback(this.props.filterName);
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
  btnType: 'wide',
  btnVal: ''
};

FilterButton.propTypes = {
  btnType: PropTypes.string,
  filterName: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  btnVal: PropTypes.string
};

export default FilterButton;
