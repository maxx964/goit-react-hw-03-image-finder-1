import React, { Component } from 'react';

import styles from './SearchBar.module.css';
import { MdImageSearch } from 'react-icons/md';
import { handleSubmit } from '../formUtils/formUtils'
class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

 handleSubmit = (e) => {
  e.preventDefault();
  const { query } = this.state;
  if (query.trim() !== '') {
    this.props.onSubmit(query);
  }
};

  render() {
    return (
      <header className={styles.searchbar}>
   <form className={styles.form} onSubmit={(e) => handleSubmit(e, this.state.query, this.props.onSubmit)}>
          <button type="submit" className={styles.button}>
            <MdImageSearch size={30} />
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;