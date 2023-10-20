import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { loadImages } from './api/api';

import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      page: 1,
      isLoading: false,
      loadMore: false,
      largeImageURL: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.getImages(this.state.query, this.state.page);
    }
  }

  getImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const { images, totalImagesCount } = await loadImages(query, page);
      this.setState((prev) => ({
        images: [...prev.images, ...images],
        loadMore: prev.page < Math.ceil(totalImagesCount / 12),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ isLoading: false });
    }
  }

  handleImageSearch = (query) => {
    this.setState({ query, page: 1, images: [] });
  }

  loadMoreImages = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  }

  openModal = (largeImageURL) => {
    this.setState({ largeImageURL });
  }

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  }

  render() {
    const { images, isLoading, loadMore, largeImageURL } = this.state;

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleImageSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && images.length === 0 && <Loader />}
        {loadMore && <Button onClick={this.loadMoreImages} shouldShow={true} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} alt="Large Image" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
