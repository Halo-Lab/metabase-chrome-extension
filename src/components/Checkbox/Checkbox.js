import React from 'react';
import PropTypes from 'prop-types';

import styles from './Checkbox.module.scss';

const Checkbox = ({ click, coin, isChecked, addClass }) => {
  return (
    <div className={`${styles.checkbox} ${addClass}`}>
      <input
        className={styles.input}
        id={coin}
        type="checkbox"
        onClick={click}
        defaultChecked={isChecked}
      />
      <label className={styles.label} htmlFor={coin}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="#C4C4C4" />
          <path
            d="M7.55165 3.90832C7.73506 3.53673 8.26494 3.53673 8.44835 3.90832L9.42878 5.89454C9.50155 6.04197 9.64214 6.1442 9.80482 6.16798L11.9981 6.48856C12.4081 6.54848 12.5715 7.0524 12.2747 7.34148L10.6884 8.8865C10.5705 9.00137 10.5166 9.16694 10.5445 9.3292L10.9187 11.5113C10.9888 11.9198 10.56 12.2313 10.1932 12.0384L8.23273 11.0074C8.08703 10.9308 7.91297 10.9308 7.76727 11.0074L5.80682 12.0384C5.44 12.2313 5.01123 11.9198 5.08129 11.5113L5.45554 9.3292C5.48337 9.16694 5.42954 9.00137 5.31161 8.8865L3.72534 7.34148C3.42854 7.0524 3.59193 6.54848 4.00189 6.48856L6.19518 6.16798C6.35786 6.1442 6.49845 6.04197 6.57122 5.89454L7.55165 3.90832Z"
            fill="white"
          />
        </svg>
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  click: () => {},
  coin: '',
  isChecked: false,
  addClass: ''
};

Checkbox.propTypes = {
  click: PropTypes.func,
  coin: PropTypes.string,
  isChecked: PropTypes.bool,
  addClass: PropTypes.string
};

export default Checkbox;
