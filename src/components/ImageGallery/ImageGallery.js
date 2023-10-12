import React from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';


const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.ImageGallery}>
    {images.map((image) => (
      <ImageGalleryItem
        key={image.id}
        src={image.webformatURL}
        alt={image.tags}
        largeImageURL={image.largeImageURL}
        onClick={() => onImageClick(image.largeImageURL)}
      />
      
    ))}
  </ul>
);

export default ImageGallery;