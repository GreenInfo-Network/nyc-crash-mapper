import React, { Component, PropTypes } from 'react';

class Search extends Component {
  static propTypes = {
    error: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string,
    result: PropTypes.shape({
      addressFormatted: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }),
    fetchLocationGeocode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    result: null,
    searchTerm: null
  }

  state = {
    inputText: '',
  }

  handleSubmit = (e) => {
    const { inputText } = this.state;

    e.preventDefault();

    if (inputText && inputText.length) {
      this.props.fetchLocationGeocode(inputText);
      this.setState({
        inputText: '',
      });
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
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search by address or intersection"
          value={inputText}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Search;
