import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [isProductsLoaded, setIsProductsLoaded] = useState(false);
    const navigate = useNavigate();

    const addToCart = async (itemId, productSize) => {
        if (!localStorage.getItem('token')) {
            toast.info('You need to Login');
            navigate('/login');
        }
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

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }

        return totalAmount;
    };

    // Read products from DB
    const readProducts = async () => {
        // Check if products have already been loaded
        if (isProductsLoaded) {
            return products;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/product/products', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setProducts(response.data);
            setIsProductsLoaded(true);  // Mark products as loaded
            return response.data; // Return the data
        } catch (error) {
            console.error('Error fetching products:', error.message);
            return []; // Return an empty array in case of error
        }
    };

    useEffect(() => {
        readProducts();
    }, []);

    // Add product to DB
    const addProduct = async (productInfo) => {
        try {
            const response = await axios.post('http://localhost:5000/api/product/addproduct', productInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Product added successfully.');

        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || 'An error occurred while adding the product.'
                : 'Network error. Please try again later.';
            console.error('Error adding product:', errorMessage);
            toast.error(errorMessage);
        }
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
        updateQuantity,
        getCartAmount,
        navigate,
        readProducts,
        addProduct,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
