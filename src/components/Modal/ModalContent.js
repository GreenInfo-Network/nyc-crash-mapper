import React, { Component } from 'react';

// HOC that wraps modal content's children
const ModalContent = WrappedComponent =>
  class MC extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };

export default ModalContent;
