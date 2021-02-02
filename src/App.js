import { Component } from 'react';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import apiService from './services';
// import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
// import ImageGalleryItem from './components/ImageGalleryItem';
// import Button from './components/Button';
// import Loader from './components/Loader';
// import Modal from './components/Modal';
// import ErrorView from './components/ErrorView';

class App extends Component {
  state = {
    query: '',
    // images: [],
    // largeImageURL: '',
    // page: 1,
    // error: null,
    // isLoading: false,
    // showModal: false,
    // status: 'idle',
  };

  componentDidMount() {
    // this.searchImages();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.query !== prevState.query) {
  //    this.searchImages(this.state.query, this.state.page);
  //   }
  // }
  // searchImages =  () => {
  //   const { query, page } = this.state;
  //   this.setState({ isLoading: true });

  //   fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=18452046-d075d28130c097165687e8e16&image_type=photo&orientation=horizontal&per_page=12`)
  //     // .then(res => res.json())
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return Promise.reject(new Error('Invalid request'));
  //     })

  //     .then(images => this.setState({ images: images.hits }))
  //     .catch(error=>this.setState({error}))
  //     .finally(() => this.setState({ isLoading: false }));
  // };

  //  handleChange = e => {
  //   this.setState({ query: e.target.value });
  // };

  handleSubmit = name => {
    this.setState({ query: name });
    // this.searchImages(this.state.query, this.state.page);
    console.log(name);
  };

  render() {
    const {
      query,
      // images,
      // largeImageURL,
      // isLoading,
      // showModal,
      // error,
      // status,
    } = this.state;
    return (
      <div>
        <Searchbar onHandleSubmit={this.handleSubmit} />

        <ImageGallery query={query} />
      </div>
    );
  }
}

export default App;
