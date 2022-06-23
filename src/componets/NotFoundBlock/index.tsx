import React from 'react';
import styles from './NotFoundBlock.module.css'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 >
       <span>&#128553;</span>
        <br/>
        Ничего не найдено!
      </h1>
      <p>К сожалению такая страница отсутствует</p>

    </div>
  );
};

export default NotFoundBlock;
