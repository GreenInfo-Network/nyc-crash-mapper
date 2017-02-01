import React, { Component } from 'react';

// HOC that wraps modal content's children
const ModalContent = (WrappedComponent, closeModal) =>
  class MC extends Component {
    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
          <button className="btn-modal-close" onClick={() => closeModal()}>
            Close
          </button>
        </div>
      );
    }
  };

export default ModalContent;
