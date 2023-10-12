import React from 'react';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, onClick }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={src} alt={alt} className={styles.ImageGalleryItemImage} onClick={onClick} />
  </li>
);

export default ImageGalleryItem;
