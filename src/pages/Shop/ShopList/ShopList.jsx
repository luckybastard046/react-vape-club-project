import React from 'react';

import FoodItem from '../ShopItem/ShopItem';

import Loader from '../../../components/Loading/Loader/Loader';

import './ShopList.scss';

const ShopList = ({ recipes }) => {
  return (
    <>
      <div className="shop-list">
        {recipes.length === 0 ? (
          <Loader 
            loaderText='Loading shop data...'
          />
        ) : (
          <div className="shop-list-item">
            {recipes.map((item, index) => (
              <FoodItem
                key={index}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShopList;
