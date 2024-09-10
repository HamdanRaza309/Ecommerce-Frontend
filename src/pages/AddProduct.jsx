import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import imageCompression from 'browser-image-compression';

function AddProduct() {
    const { addProduct } = useContext(ShopContext);
    const [productInfo, setProductInfo] = useState({
        name: '',
        price: '',
        description: '',
        sizes: [],
        category: '',
        subCategory: '',
        images: [],
        bestseller: false,
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        try {
            const options = {
                maxSizeMB: 1, // Set the max size in MB
                maxWidthOrHeight: 1024, // Max dimensions
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);
            const base64 = await convertToBase64(compressedFile);
            setProductInfo((prevState) => ({
                ...prevState,
                images: [...prevState.images, base64],
            }));
        } catch (error) {
            console.error("Error compressing the image: ", error);
        }
    };

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productInfo.images.length === 0) {
            alert('Please upload at least one image.');
            return;
        }
        addProduct(productInfo);
        setProductInfo({
            name: '',
            price: '',
            description: '',
            sizes: [],
            category: '',
            subCategory: '',
            images: [],
            bestseller: false,
        });
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="text-3xl">
                    <Title text1="ADD" text2="A NEW PRODUCT" />
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    {/* Product Name and Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                id="name"
                                name="name"
                                value={productInfo.name}
                                onChange={handleChange}
                                className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Sale Price</label>
                            <input
                                id="price"
                                name="price"
                                value={productInfo.price}
                                onChange={handleChange}
                                className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                type="number"
                            />
                        </div>
                    </div>

                    {/* Category and Sub-Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                id="category"
                                name="category"
                                value={productInfo.category}
                                onChange={handleChange}
                                className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                type="text"
                            />
                        </div>
                        <div>
                            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub-Category</label>
                            <input
                                id="subCategory"
                                name="subCategory"
                                value={productInfo.subCategory}
                                onChange={handleChange}
                                className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Product Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={productInfo.description}
                            onChange={handleChange}
                            className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                            rows="4"
                        />
                    </div>

                    {/* Select Sizes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Sizes</label>
                        <div className="mt-2 flex flex-wrap gap-4">
                            {['S', 'M', 'L', 'XL'].map((size, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-600 accent-green-600"
                                        value={size}
                                        onChange={() => handleSizeChange(size)}
                                        checked={productInfo.sizes.includes(size)}
                                    />
                                    <span className="text-gray-700">{size}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Upload Images */}
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images</label>
                        <input
                            id="images"
                            name="images"
                            onChange={handleImageUpload}
                            className="mt-2 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                            type="file"
                            accept="image/*"
                            multiple
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            You can upload up to 4 images. At least 1 image is required.
                        </p>

                        {/* Display Uploaded Images */}
                        {productInfo.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {productInfo.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Uploaded Preview ${index + 1}`}
                                        className="h-32 w-full object-cover rounded-md"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Best Seller Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="bestseller"
                            name="bestseller"
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-600 accent-green-600"
                            onChange={handleChange}
                            checked={productInfo.bestseller}
                        />
                        <label htmlFor="bestseller" className="ml-2 block text-sm font-medium text-gray-700">Best Seller</label>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-8">
                        <button type="submit" className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-green-600 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#16a34a] transition ease-in-out duration-300 hover:text-green-600 hover:bg-transparent hover:border-green-600 hover:shadow-[inset_0_0_0_0_#16a34a]">
                            Publish Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
