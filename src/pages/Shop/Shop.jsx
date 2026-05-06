import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../../appwrite/context/AuthContext";
import { useCart } from "../../appwrite/context/CartContext";
import { useProduct } from "../../appwrite/context/ProductsContext";

import { account, databases, ID, client } from '../../appwrite/appwriteClient';

import WrapperLogIn from "../../layout/Wrappers/WrapperLogIn/WrapperLogIn";
import Loader from "../../components/Loading/Loader/Loader";
import ShopCard from "./ShopCard/ShopCard";

import { TiShoppingCart } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

import { toast } from "react-toastify";

import './Shop.scss';

function Shop() {
    const { user, loading } = useAuth();
    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);


    return (
      <WrapperLogIn title='Pub'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <section className="shop">
            <div className="shop-search">
              <button className="shop-btn-search">
                <IoSearch size={30} />
              </button>
              <input 
                type="search" 
                className="shop-input-search"
                placeholder="Search for your today eat..."
              />
            </div>
            <div className="shop-food-list">
         
            </div>
          </section>
        </motion.div>
      </WrapperLogIn>
    );
}

export default Shop;