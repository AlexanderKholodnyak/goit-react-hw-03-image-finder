import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    name: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name.trim() === '') {
      toast.error('Что ищем ?');
      return;
    }
    this.props.onHandleSubmit(this.state.name);
    // console.log(this.state.name);
    this.setState({ name: '' });
  };
  handleChange = e => {
    this.setState({ name: e.currentTarget.value });
  };

  render() {
    return (
      <header onSubmit={this.handleSubmit} className={s.Searchbar}>
        <form className={s.SearchForm}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  // onSearchQueryChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
};

export default Searchbar;
