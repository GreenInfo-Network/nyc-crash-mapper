import React, { Component, PropTypes } from 'react';
import Collapse from 'react-collapse';
// import cx from 'classnames';

class OptionsContainer extends Component {
  constructor() {
    super();
    this.state = {
      opened: true
    };
    this.handleOpenClose = this.handleOpenClose.bind(this);
  }

  handleOpenClose() {
    this.setState(prevState => ({ opened: !prevState.opened }));
  }

  render() {
    const { children, ruledLine, title } = this.props;
    const { opened } = this.state;

    return (
      <section className="options-container">
        <div className="options-container-header" onClick={() => this.handleOpenClose()}>
          <h6 className="options-container-title roboto-bold">{title}</h6>
          <span className="options-container-collapse-icon">{opened ? '–' : '+'}</span>
          { ruledLine ? <hr /> : null }
        </div>
        <Collapse
          className="options-container-collapsable"
          isOpened={opened}
        >
          { children }
        </Collapse>
      </section>
    );
  }
}

OptionsContainer.defaultProps = {
  ruledLine: false
};

OptionsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  ruledLine: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};

export default OptionsContainer;
