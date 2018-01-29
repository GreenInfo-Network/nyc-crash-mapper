import React, { Component } from 'react';

class Search extends Component {
  state = {
    inputText: '',
  }

  handleSubmit = (e) => {
    const { inputText } = this.state;

    e.preventDefault();

    if (inputText && inputText.length) {
      // TO DO
    }
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  render() {
    const { inputText } = this.state;

    return (
      <div className="Search ui">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search by address or intersection"
            value={inputText}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default Search;
