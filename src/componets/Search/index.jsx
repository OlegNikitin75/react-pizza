import React, {useCallback, useContext, useRef, useState} from 'react';
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

const Search = () => {
  const searchRef = useRef();
  const [value, setValue] = useState('');
  const {setSearchValue} = useContext(SearchContext);

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    searchRef.current.focus();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 250), [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
        <path d="M0 0h48v48H0z" fill="none"/>
      </svg>
      <input
        ref={searchRef}
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {
        value &&
        <svg
          onClick={onClickClear}
          className={styles.clear} height="512px" version="1.1" viewBox="0 0 512 512" width="512px"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
        </svg>
      }
    </div>
  );
};

export default Search;
