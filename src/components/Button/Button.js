import React from 'react';

import styles from './Button.module.css';

const Button = ({ onClick,shouldShow }) => (
   <button
    type="button"
    onClick={onClick}
    className={styles.button}
    style={{ display: shouldShow ? 'block' : 'none' }}
  >
    Load more
  </button>
);

export default Button;