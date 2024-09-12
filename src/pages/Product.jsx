import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import Title from '../components/Title';
import Review from '../components/Review';
import ProductReviews from '../components/ProductReviews';
import imageCompression from 'browser-image-compression';

function Product() {

    const { id } = useParams();
    const { decodeToken, updateProduct, deleteProduct, readProducts, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [ratings, setRatings] = useState(0);
    const [numOfReviews, setNumOfReviews] = useState(0);
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

    const token = localStorage.getItem('token');
    const decoded = decodeToken(token);
    const userRole = decoded?.user?.role;

    const fetchProduct = async () => {
        try {
            const products = await readProducts();
            const foundProduct = products.find(item => item._id === id);

            if (foundProduct) {
                setProductData(foundProduct);
                setImage(foundProduct.images?.[0] || '');
                setRatings(foundProduct.ratings);
                setNumOfReviews(foundProduct.numOfReviews)
            } else {
                console.error('Product not found');
                setProductData(null);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
            setProductData(null);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleDelete = () => {
        setOpenDeleteModal(true);
    }

    const handleDeleteProduct = async () => {
        await deleteProduct(id);
    };

    const handleUpdate = () => {
        setOpenUpdateModal(true);
        setProductInfo({
            name: productData.name,
            price: productData.price,
            description: productData.description,
            sizes: productData.sizes,
            category: productData.category,
            subCategory: productData.subCategory,
            images: productData.images,
            bestseller: productData.bestseller,
        });
    };

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
        const files = Array.from(e.target.files); // Get all files

        try {
            // Compress all images and convert them to Base64
            const compressedImages = await Promise.all(
                files.map(async (file) => {
                    const options = {
                        maxSizeMB: 1, // Max size in MB
                        maxWidthOrHeight: 1024, // Max dimensions
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(file, options);
                    const base64 = await convertToBase64(compressedFile);
                    return base64;
                })
            );

            // Update the state with the new images, limited to 4
            setProductInfo((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...compressedImages].slice(0, 4),
            }));
        } catch (error) {
            console.error("Error compressing the images: ", error);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(id, productInfo);
        setOpenUpdateModal(false);
    };


    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
            {userRole === 'admin' && (
                <div className='relative pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
                    <div className="absolute top-0 left-4 flex gap-4 z-10">
                        {userRole === 'admin' && (
                            <>
                                <button
                                    onClick={handleDelete}
                                    className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-red-500 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#ef4444] transition ease-in-out duration-300 hover:text-red-500 hover:bg-transparent hover:border-red-500 hover:shadow-[inset_0_0_0_0_#ef4444]"
                                >
                                    DELETE
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-green-500 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#22c55e] transition ease-in-out duration-300 hover:text-green-500 hover:bg-transparent hover:border-green-500 hover:shadow-[inset_0_0_0_0_#22c55e]"
                                >
                                    UPDATE
                                </button>

                            </>
                        )}
                    </div>
                </div>
            )}
            <div className='flex gap-12 pb-20 sm:gap-12 flex-col sm:flex-row mt-10 border-b'>
                <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
                    <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.images?.map((item, index) => (
                            <img
                                src={item?.trim() ? item : 'https://via.placeholder.com/500?text=No+Image'}
                                key={index}
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                                alt={`Product Image ${index + 1}`}
                                onClick={() => setImage(item?.trim() ? item : 'https://via.placeholder.com/500?text=No+Image')}
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img src={image?.trim() ? image : 'https://via.placeholder.com/500?text=No+Image'} alt="Selected Product" className='w-full h-auto' />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className='font-medium text-blue-500 text-2xl mt-2'>{productData.name}</h1>
                    <Review ratings={ratings} numOfReviews={numOfReviews} />
                    <p className='mt-5 font-medium text-3xl'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes?.map((item, index) => (
                                <button
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-yellow-400' : ''} cursor-pointer`}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(productData, size)}
                        className='btnForWhiteBg'
                    >
                        ADD TO CART
                    </button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original Product</p>
                        <p>Cash on delivery is available on this Product</p>
                        <p>Easy return and exchange Policy in 7 days</p>
                    </div>
                </div>
            </div>
            <div>
                <ProductReviews productId={id} />
            </div>
            <div className="mt-20">
                <div className="flex">
                    <b className='border px-5 py-3 text-sm cursor-pointer'>Description</b>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>Elevate your style with our latest fashion collection, featuring high-quality materials and timeless designs. From chic dresses to versatile jackets, each piece combines contemporary trends with classic elegance. Perfect for making a statement or refining your everyday look.</p>
                    <p>Our collection blends contemporary trends with classic elegance, ensuring that you'll always look and feel your best. Each item is meticulously designed with attention to detail, from flattering cuts to premium fabrics, to create a look that is both sophisticated and effortlessly stylish.</p>
                </div>
            </div>
            <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

            {openUpdateModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 p-4">
                    <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 md:p-8 max-h-[90vh] overflow-auto">
                        <div className="text-center text-2xl font-semibold mb-6">
                            <Title text1="Update" text2="PRODUCT" />
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Product Name and Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={productInfo.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 text-gray-900"
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
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 text-gray-900"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Category and Sub-Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        id="category"
                                        name="category"
                                        value={productInfo.category}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 text-gray-900"
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
                                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 text-gray-900"
                                        type="text"
                                    />
                                </div>
                            </div>

                            {/* Product Sizes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sizes Available</label>
                                <div className="mt-2 flex flex-wrap gap-4">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((sizeOption, index) => (
                                        <label key={index} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                name="sizes"
                                                value={sizeOption}
                                                checked={productInfo.sizes.includes(sizeOption)}
                                                onChange={() => handleSizeChange(sizeOption)}
                                                className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-600 accent-green-600"
                                            />
                                            <span className="ml-2 text-gray-700">{sizeOption}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={productInfo.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-4 text-gray-900"
                                />
                            </div>

                            {/* Bestseller */}
                            <div className="flex items-center space-x-2">
                                <input
                                    id="bestseller"
                                    name="bestseller"
                                    type="checkbox"
                                    checked={productInfo.bestseller}
                                    onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-600 accent-green-600"
                                />
                                <label htmlFor="bestseller" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                    <span>Bestseller</span>
                                </label>
                            </div>


                            {/* Image Upload */}
                            <div>
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                    Upload Images (Max 4)
                                </label>
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
                                <div className="mt-4 flex gap-2 flex-wrap">
                                    {productInfo.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Uploaded ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                        />
                                    ))}
                                </div>
                            </div>


                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setOpenUpdateModal(false)}
                                    className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-gray-400 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#9ca3af] transition ease-in-out duration-300 hover:text-gray-400 hover:bg-transparent hover:border-gray-400 hover:shadow-[inset_0_0_0_0_#9ca3af]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-green-500 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#22c55e] transition ease-in-out duration-300 hover:text-green-500 hover:bg-transparent hover:border-green-500 hover:shadow-[inset_0_0_0_0_#22c55e]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}

            {openDeleteModal && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 p-4">
                    <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 md:p-8 max-h-[90vh] overflow-auto">
                        <div className="text-center text-2xl font-semibold mb-6">
                            <Title text1="Delete" text2="PRODUCT" />
                        </div>
                        <div>
                            Are you sure you want to delete this product?
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setOpenDeleteModal(false)}
                                className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-gray-400 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#9ca3af] transition ease-in-out duration-300 hover:text-gray-400 hover:bg-transparent hover:border-gray-400 hover:shadow-[inset_0_0_0_0_#9ca3af]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteProduct}
                                className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-red-500 border-2 border-transparent rounded-none shadow-[inset_0_0_0_50px_#ef4444] transition ease-in-out duration-300 hover:text-red-500 hover:bg-transparent hover:border-red-500 hover:shadow-[inset_0_0_0_0_#ef4444]"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    ) : (
        <div className="text-center py-10">
            <p>Product not found</p>
        </div>
    );
}

export default Product;