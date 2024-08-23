import { createContext, useState } from "react";
import { products } from "../frontend_assets/assets";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
