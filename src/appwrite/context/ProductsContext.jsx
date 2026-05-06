import React, { createContext, useContext, useState, useEffect } from 'react';
import { databases, ID, storage, Query, client } from '../appwriteClient';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const DATABASE_ID = "69ec27a400008e34e099";
  const NOTES_COLLECTION_ID = "notes"; 
  const PRODUCTS_COLLECTION_ID = "products"; 
  const BUCKET_ID = "69ec315a00269f2f4dd2"; 

  const addProduct = async ({ name, imageId, category, description, discountedPrice, originalPrice }) => {
      try {
          const session = await databases.createDocument(
              DATABASE_ID,
              PRODUCTS_COLLECTION_ID,
              ID.unique(),
              {
                  name,
                  imageId, 
                  category, 
                  description, 
                  discountedPrice, 
                  originalPrice
              }
          )
          return session
      } catch (error) {
        console.log(error);
      }
  }

  const updateProduct = async ({ productId, name, imageId, category, description, discountedPrice, originalPrice }) =>{
      try {
          await databases.updateDocument(
              DATABASE_ID,
              PRODUCTS_COLLECTION_ID,
              productId,
              {
                  name,
                  imageId, 
                  category, 
                  description, 
                  discountedPrice, 
                  originalPrice
              }
          )
      } catch (error) {
        console.log(error);
      }
  }

  const delProduct = async (productId) => {
      try {
          const session = await databases.deleteDocument(
              DATABASE_ID,
              PRODUCTS_COLLECTION_ID,
              productId
          )
          
          return session
      } catch (error) {
        console.log(error);
      }
  }

  const getProduct = async(documentId) => {
      try {
          const session = databases.getDocument(
              DATABASE_ID,
              PRODUCTS_COLLECTION_ID,
              documentId
          )
          
          return session
      } catch (error) {
        console.log(error);
      }
  }

  const listAllProducts = async () => {
      try {
          const session = await databases.listDocuments(
              DATABASE_ID,
              PRODUCTS_COLLECTION_ID
          )

          return session
      } catch (error) {
        console.log(error);
      }
  }
  // file uploading 

  const uploadImage = async (file) => {
      try {
          let session = await storage.createFile(
            BUCKET_ID, 
            ID.unique(),
            file
          )

          return session;
      } catch (error) {
        console.log(error);
      }
  }

  const delImage = async (fileId) => {
      try {
          const session= storage.deleteFile(
              BUCKET_ID,
              fileId
          )

          return session
      } catch (error) {
        console.log(error);
      }
  }

  const getFilePre = (fileId) => {
      return this.storage.getFilePreview(
        BUCKET_ID, 
        fileId
      );
  }

  return (
    <ProductsContext.Provider value={{ 
        addProduct, 
        updateProduct,
        delProduct,
        getProduct, 
        listAllProducts, 
        uploadImage, 
        delImage,
        getFilePre
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProduct = () => useContext(ProductsContext);