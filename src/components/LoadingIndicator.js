import React, { Component, PropTypes } from 'react';
import Spinner from 'spin';

class LoadingIndicator extends Component {
  constructor() {
    super();
    this.el = undefined;
    this.spinner = undefined;
    this.opts = {
      color: '#17838f', // scss/_variables.$marine-light
      lines: 11,
      length: 7,
      width: 3,
      radius: 6,
      scale: 1,
      shadow: false,
    };
  }

  componentDidMount() {
    this.spinner = new Spinner(this.opts).spin(this.el);
    window.spinner = this.spinner;
    window.el = this.el;
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;

    if (isLoading) {
      this.spinner.spin(this.el);
    } else {
      this.spinner.stop();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div ref={(_) => { this.el = _; }} className="loading-indicator" />
    );
  }
}

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingIndicator;
