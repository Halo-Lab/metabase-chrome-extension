import React from 'react';
import classes from './TableHeader.module.scss';

const TableHeader = () => {
  return (
    <div className={classes.wrapper}>
      <span className={classes.name}>Name</span>
      <span className={classes.price}>Price</span>
      <span className={classes.percent}>24HR</span>
    </div>
  );
};

export default TableHeader;
