import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [isProductsLoaded, setIsProductsLoaded] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const currency = '$';
    const deliveryFee = 10;

    // Helper function to decode JWT token
    const decodeToken = (token) => {
        if (!token) return null;

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')
        );

        return JSON.parse(jsonPayload);
    };

    // Function to fetch cart items
    const getCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart/cart-items', {
                headers: { 'auth-token': `Bearer ${token}` }
            });

            const cartItemsWithProducts = response.data.map(item => ({
                ...item,
                product: item.productId
            }));

            return cartItemsWithProducts;
        } catch (error) {
            toast.error('Error fetching cart items. Please try again later.');
            return [];
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = await getCartItems();
            setCartItems(items);
        };

        fetchCartItems();
    }, [token]);

    // Function to add item to cart
    const addToCart = async (product, size) => {
        if (!token) {
            toast.info('You need to log in to add items to the cart.');
            navigate('/login');
            return;
        }

        if (!size) {
            toast.error('Please select a product size.');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/cart/add-to-cart',
                {
                    productId: product._id,
                    productName: product.name,
                    productSize: size,
                    quantity: 1,
                    price: product.price,
                },
                { headers: { 'auth-token': `Bearer ${token}` } }
            );

            toast.success('Item successfully added to cart.');
            const updatedCartItems = await getCartItems();
            setCartItems(updatedCartItems);
        } catch (error) {
            toast.error('Failed to add item to cart. Please try again.');
        }
    };

    // Function to update cart item quantity
    const updateCartItem = async (cartItemId, quantity) => {
        if (!token) {
            toast.info('You need to log in to update cart items.');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/cart/cart-item/update',
                { cartItemId, quantity },
                { headers: { 'auth-token': `Bearer ${token}` } }
            );

            if (response.data.updatedItem) {
                toast.success('Cart item updated successfully.');
            } else {
                toast.info('Cart item removed from cart.');
            }

            const updatedCartItems = await getCartItems();
            setCartItems(updatedCartItems);
        } catch (error) {
            toast.error('Failed to update cart item. Please try again.');
        }
    };

    // Function to delete cart item
    const deleteCartItem = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/cart-item/delete/${cartItemId}`, {
                headers: { 'auth-token': `Bearer ${token}` }
            });

            toast.success('Cart item deleted successfully.');
            const updatedCartItems = await getCartItems();
            setCartItems(updatedCartItems);
        } catch (error) {
            toast.error('Failed to delete cart item. Please try again.');
        }
    };

    // Function to get total cart item count
    const getCartCount = () => cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);

    // Function to get total cart amount
    console.log(cartItems);

    const getCartAmount = () => cartItems.reduce((totalAmount, item) =>
        totalAmount + item.product.price * item.quantity, 0);

    // CRUD operations for products
    // Function to fetch products
    const readProducts = async () => {
        if (isProductsLoaded) return products;

        try {
            const response = await axios.get('http://localhost:5000/api/product/products');
            setProducts(response.data);
            setIsProductsLoaded(true);
            return response.data;
        } catch (error) {
            toast.error('Error fetching products. Please try again later.');
            return [];
        }
    };

    useEffect(() => {
        readProducts();
    }, []);

    const addProduct = async (productInfo) => {
        try {
            await axios.post('http://localhost:5000/api/product/addproduct', productInfo, {
                headers: { 'auth-token': `Bearer ${token}` }
            });
            toast.success('Product added successfully.');
            await readProducts(); // Refresh the product list
        } catch (error) {
            toast.error('Failed to add product. Please try again.');
        }
    };

    const updateProduct = async (id, productInfo) => {
        try {
            await axios.put(`http://localhost:5000/api/product/updateproduct/${id}`, productInfo, {
                headers: { 'auth-token': `Bearer ${token}` }
            });
            toast.success('Product updated successfully.');
            await readProducts(); // Refresh the product list
        } catch (error) {
            toast.error('Failed to update product. Please try again.');
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/product/deleteproduct/${id}`, {
                headers: { 'auth-token': `Bearer ${token}` }
            });
            toast.success('Product deleted successfully.');
            await readProducts(); // Refresh the product list
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete product. Please try again.');
        }
    };

    const contextValue = {
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        updateCartItem,
        deleteCartItem,
        getCartCount,
        getCartAmount,
        products,
        readProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        navigate,
        decodeToken,
        getCartItems,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
