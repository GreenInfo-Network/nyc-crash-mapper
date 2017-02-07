import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

// TO DO: create dl button using URL & SQL API query, e.g.
// https://username.cartodb.com/api/v2/sql?q=SELECT%20*%20FROM%20table_name&format=CSV
class ShareURL extends Component {
  constructor() {
    super();
    this.state = {
      copied: false,
      value: window.location.href
    };
  }


  render() {
    const { value, copied } = this.state;

    return (
      <div className="modal-share-url">
        <p>The current map view and any active filters may be shared using this URL:</p>
        <input type="text" value={value} onFocus={e => e.target.select()} readOnly />
        <CopyToClipboard text={value} onCopy={() => this.setState({ copied: true })}>
          <button>Copy</button>
        </CopyToClipboard>
        <span className="copied">
          { copied ? 'Copied!' : '' }
        </span>
      </div>
    );
  }
}

export default ShareURL;
