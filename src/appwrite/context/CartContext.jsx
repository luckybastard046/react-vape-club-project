import React, { createContext, useContext, useState, useEffect } from "react";

import { 
    client, 
    account, 
    databases, 
    ID, 
    Query, 
    storage
} from "../appwriteClient";

const DATABASE_ID = "69ec27a400008e34e099";
const CART_COLLECTION_ID = "cart"; // Your cart collection

// ===== Context =====
const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cart items from Appwrite
    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await databases.listDocuments(
                DATABASE_ID,
                CART_COLLECTION_ID,
                [Query.equal("userId", userId)]
            );
            setCart(res.documents);
        } catch (err) {
            console.error("Error fetching cart:", err);
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart (increase quantity if exists)
    const addToCart = async (product) => {
        try {
            const existing = cart.find((item) => item.productId === product.id);
            if (existing) {
                // Update quantity
                await databases.updateDocument(
                    DATABASE_ID,
                    CART_COLLECTION_ID,
                    existing.$id,
                    { quantity: existing.quantity + 1 }
                );
            } else {
                // Create new cart item
                await databases.createDocument(
                    DATABASE_ID,
                    CART_COLLECTION_ID,
                    ID.unique(),
                    {
                        userId,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    }
                );
            }
            fetchCart();
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    // Remove one quantity (delete if quantity becomes 0)
    const removeFromCart = async (productId) => {
        try {
            const existing = cart.find((item) => item.productId === productId);
            if (!existing) return;

            if (existing.quantity > 1) {
                await databases.updateDocument(
                    DATABASE_ID,
                    CART_COLLECTION_ID,
                    existing.$id,
                    { quantity: existing.quantity - 1 }
                );
            } else {
                await deleteCartItem(productId);
                return;
            }
            fetchCart();
        } catch (err) {
            console.error("Error removing from cart:", err);
        }
    };

    // Delete item completely
    const deleteCartItem = async (productId) => {
        try {
            const existing = cart.find((item) => item.productId === productId);
            if (!existing) return;

            await databases.deleteDocument(
                DATABASE_ID,
                CART_COLLECTION_ID,
                existing.$id
            );
            fetchCart();
        } catch (err) {
            console.error("Error deleting cart item:", err);
        }
    };

    useEffect(() => {
        if (userId) fetchCart();
    }, [userId]);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                removeFromCart,
                deleteCartItem,
                fetchCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}