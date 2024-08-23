import { createContext, useEffect, useState } from "react";
import { products } from "../frontend_assets/assets";
import { toast } from "react-toastify";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, productSize) => {
        if (!productSize) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][productSize]) {
                cartData[itemId][productSize] += 1;
            } else {
                cartData[itemId][productSize] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][productSize] = 1;
        }

        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error counting cart items:", error);
                }
            }
        }
        return totalCount;
    };

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
