import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

function AddProduct() {
    const { addProduct } = useContext(ShopContext);
    const [productInfo, setProductInfo] = useState({
        name: '',  // Changed from productName to name
        price: '',  // Changed from salePrice to price
        description: '',
        sizes: [],
        category: '',
        subCategory: '',
        images: [],  // Changed from images to image
        bestseller: false  // Ensured naming consistency
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductInfo({
            ...productInfo,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSizeChange = (size) => {
        setProductInfo((prevState) => ({
            ...prevState,
            sizes: prevState.sizes.includes(size)
                ? prevState.sizes.filter((productSize) => productSize !== size)
                : [...prevState.sizes, size],
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setProductInfo({
            ...productInfo,
            images: files.slice(0, 4),  // Ensured naming consistency
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', productInfo);
        addProduct(productInfo);
    };

    return (
        <div className="min-h-screen">
            <div className="text-center text-xl sm:text-2xl mb-4">
                <Title text1={'ADD'} text2={'A NEW PRODUCT'} />
            </div>
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="text-lg sm:text-xl mb-4">
                    <Title text1={'ENTER'} text2={'INFORMATION'} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side */}
                        <div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={productInfo.name}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md py-2 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Sale Price
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        value={productInfo.price}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md py-2 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Product Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={productInfo.description}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md py-2 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">
                                        Select Sizes
                                    </label>
                                    <div className="flex gap-4 mt-2">
                                        {['S', 'M', 'L', 'XL'].map((size, index) => (
                                            <label key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    value={size}
                                                    onChange={() => handleSizeChange(size)}
                                                    checked={productInfo.sizes.includes(size)}
                                                />
                                                <span className="text-gray-700">{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <input
                                    id="category"
                                    name="category"
                                    value={productInfo.category}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md py-2 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                                    Sub-Category
                                </label>
                                <input
                                    id="subCategory"
                                    name="subCategory"
                                    value={productInfo.subCategory}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md py-2 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                    Upload Images
                                </label>
                                <input
                                    id="images"
                                    name="images"
                                    onChange={handleImageUpload}
                                    className="border border-gray-300 rounded-md py-2 px-4 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="file"
                                    accept="images/*"
                                    multiple
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    You can upload up to 4 images. At least 1 image is required.
                                </p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="bestseller"
                                    name="bestseller"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    onChange={handleChange}
                                    checked={productInfo.bestseller}
                                />
                                <label htmlFor="bestseller" className="ml-2 block text-sm font-medium text-gray-700">
                                    Best Seller
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm active:bg-gray-700">
                            Publish Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
