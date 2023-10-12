import React, { Component } from 'react';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import styles from './App.module.css';
class App extends Component {
  state = {
    images: [],
    isLoading: false,
    largeImageURL: '',
    query: '',
    page: 1,
  };

  componentDidMount() {
   
    this.loadImages('initialQuery', 1); 
  }

  handleImageSearch = async (query) => {
    this.setState({
      images: [],
      isLoading: true,
      query,
      page: 1,
    });

    this.loadImages(query, 1);
  };

  loadMoreImages = () => {
    const { query, page } = this.state;
    this.setState(
      {
        isLoading: true,
        page: page + 1,
      },
      () => {
        this.loadImages(query, page + 1);
      }
    );
  };

  loadImages = async (query, page) => {
    const apiKey = '39358153-a46635e1a9ac8a2573ff17e3b';
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const newImages = data.hits;

      this.setState((prevState) => ({
        images: [...prevState.images, ...newImages],
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
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
    const { images, isLoading, largeImageURL } = this.state;

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleImageSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.loadMoreImages} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} alt="Large Image" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
