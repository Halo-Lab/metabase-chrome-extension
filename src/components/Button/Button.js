import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.scss';

const Button = () => {
  return <button className={`${style.button}`}></button>;
};

Button.propTypes = {};

export default Button;
