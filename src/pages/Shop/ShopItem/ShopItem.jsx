import React, { useState } from 'react';
import { useCart } from '../../../appwrite/context/CartContext';

import Loader from '../../../components/Loading/Loader/Loader';
import ImageWithLoader from '../../../components/ImageWithLoader/ImageWithLoader';

import './ShopItem.scss';

const ShopItem = ({ item }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="shop-item">
        <ul className="shop-item-details">
          <li>
            <h3 className="shop-item-name">{item.name}</h3>
              <div className="shop-item-image">
                <ImageWithLoader
                  src={item.image}
                  alt='Shop image'
                  width='100%'
                  height='100%'
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
              <div className='shop-item-content'>
                <p className="shop-item-ingredients"><span>Ingredients: </span> {item.ingredients}</p>
                <p className="shop-item-caloriesPerServing"><span>Calories per serving: </span>{item.caloriesPerServing}</p>
                <p className="shop-item-rating"><span>Rating: </span>{item.rating}</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ShopItem;
