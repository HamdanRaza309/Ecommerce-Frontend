import { createContext } from "react";
import { products } from "../frontend_assets/assets";
export const shopContext = createContext();

const shopContextProvider = (props) => {

    const currency = '$';
    const deliveryFee = 10;
    const value = {
        products, currency, deliveryFee
    }

    return (
        <shopContextProvider value={value}>
            {props.children}
        </shopContextProvider>
    )
}


export default shopContextProvider; 