import { createContext } from "react";
import { products } from "../frontend_assets/assets";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const deliveryFee = 10;

    const value = {
        products,
        currency,
        deliveryFee
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
