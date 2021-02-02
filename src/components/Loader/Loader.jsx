import React from 'react';
import Spinner from 'react-loader-spinner';
import s from './Loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Loader() {
  return (
    <Spinner
      className={s.Loader}
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}

export default Loader;
