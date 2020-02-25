import React from 'react';
import { func, string } from "prop-types";

import classes from './Checkbox.module.scss';

const Checkbox = ({click, coin}) => {
  return (
    <div className={classes.Checkbox}>
      <input className={classes.Input}  id={coin} type='checkbox' onClick={click} />
      <label className={classes.Label} htmlFor={coin} >
        <svg width="14" height="12" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.1875 1C13.1042 1 11.2292 2.3 10.5 4C9.77083 2.3 7.89583 1 5.8125 1C3.20833 1 1.125 2.9 1.125 5.5C1.125 9 4.77083 12 10.5 17C16.2292 12 19.875 9 19.875 5.5C19.875 2.9 17.7917 1 15.1875 1V1Z" stroke="#115293"/>
        </svg>
      </label>
    </div>
  )
}

Checkbox.defaultProps = {
  click: ()=>{},
  coin: ''
}

Checkbox.propTypes = {
  click: func,
  coin: string
}


export default Checkbox;