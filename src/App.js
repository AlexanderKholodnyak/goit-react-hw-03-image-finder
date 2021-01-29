//import logo from './logo.svg';
//import './App.css';

import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './components/Searchbar';
import Container from './components/Container';
import apiService from './services';

class App extends Component {
  state = {
    query: '',
    images: [],
    largeImageURL: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
  };

  searchImages = async () => {
    const { query, page } = this.state;

    if (query.trim() === '') {
      return toast.error(
        'No-no! Dont joke with me! Enter something interesting!',
      );
    }

    this.toggleLoader();

    try {
      const request = await apiService(query, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...request],
        page: page + 1,
      }));
      if (request.length === 0) {
        this.setState({ error: `No results were found for ${query}!` });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
      this.toggleLoader();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchImages();
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  render() {
    const {
      query,
      images,
      largeImageURL,
      isLoading,
      showModal,
      error,
    } = this.state;
    return (
      <Container>
        <Searchbar
          onHandleSubmit={this.handleSubmit}
          onSearchQueryChange={this.handleChange}
          value={query}
        />

        <ToastContainer autoClose={3700} />
      </Container>
    );
  }
}

export default App;
