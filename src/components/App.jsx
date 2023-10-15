import React, { Component } from 'react';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { loadImages } from './api/api';

import styles from './App.module.css';
class App extends Component {
  state = {
    images: [],
    isLoading: false,
    largeImageURL: '',
    query: '',
    page: 1,
    totalImagesCount: 0,
  };

 
  handleImageSearch = async (query) => {
    this.setState({
      images: [],
      query,
      page: 1,
      totalImagesCount: 0,
    });

    try {
      this.setState({ isLoading: true });

      const { images, totalImagesCount } = await loadImages(query, 1);
      this.setState({
        images: images,
        totalImagesCount,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async () => {
    const { query, page } = this.state;
    this.setState({
      page: page + 1,
    });

    try {
      this.setState({ isLoading: true });

      const { images } = await loadImages(query, page + 1);
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = (largeImageURL) => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { images, isLoading, largeImageURL, totalImagesCount } = this.state;

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleImageSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length < totalImagesCount && (
        <Button onClick={this.loadMoreImages} shouldShow={true} />)}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} alt="Large Image" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
