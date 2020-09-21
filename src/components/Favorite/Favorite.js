import React from 'react';
import PropTypes from 'prop-types';
import Item from './FavoriteItem';

import styles from './Favorite.module.scss';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

const Favorite = ({ data, toogleFavorite }) => {
  console.log(data);
  const params = {
    slidesPerView: 'auto',
    spaceBetween: 16
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Favorite</h2>
      <Swiper {...params} shouldSwiperUpdate>
        {data.map((item, index) => {
          return (
            <Item {...item} key={item.id} number={index + 1} toogleFavorite={toogleFavorite} />
          );
        })}
      </Swiper>
    </div>
  );
};

Favorite.defaultProps = {
  data: [],
  toogleFavorite: () => {}
};

Favorite.propTypes = {
  data: PropTypes.array,
  toogleFavorite: PropTypes.func
};

export default Favorite;
