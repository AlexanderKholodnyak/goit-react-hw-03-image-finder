import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import Loader from '../Loader';
import Modal from '../Modal';
import ErrorView from '../ErrorView';
import Button from '../Button';

class ImageGallery extends Component {
  state = {
    images: [],
    largeImageURL: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    // status: 'idle',
  };
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    // const { page } = this.state;
    if (prevQuery !== nextQuery) {
      this.setState({ images: [], page: 1, error: null });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      // this.setState({ page: 1 });

      this.searchImages();
    }
  }

  searchImages = () => {
    this.setState({ isLoading: true });
    const nextQuery = this.props.query;
    const { page } = this.state;
    fetch(
      `https://pixabay.com/api/?q=${nextQuery}&page=${page}&key=18452046-d075d28130c097165687e8e16&image_type=photo&orientation=horizontal&per_page=12`,
    )
      // .then(res => res.json())
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Invalid request'));
      })

      // .then(images => this.setState({ images: images.hits }))
      .then(newImages => {
        if (newImages.total !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages.hits],
          }));
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.scrollPage();
  };
  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log(1);
  };
  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 500);
  };

  render() {
    const { images, error, isLoading, largeImageURL, showModal } = this.state;
    return (
      <div>
        {error && <ErrorView textError={error.message} />}

        {
          <ul className={s.ImageGallery}>
            {images.map(
              ({ id, webformatURL, largeImageURL, tags, onOpenModal }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  onOpenModal={this.onOpenModal}
                />
              ),
            )}
          </ul>
        }
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {showModal && (
          <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          />
        )}
        {/* <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          /> */}
        {<ToastContainer autoClose={3000} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
