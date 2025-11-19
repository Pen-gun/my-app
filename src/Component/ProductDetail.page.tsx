import { ProductIdHook } from '../Hooks/ProductIdHook';
import { useParams } from 'react-router-dom';

import { useAddToCart } from '../Hooks/CartHook';

const ProductDetail = () => {
    const { mutate: addToCart } = useAddToCart();
    const { id } = useParams();
    const { data: product, isLoading } = ProductIdHook(Number(id));
    if (isLoading) {
        return <div>Loading...</div>;
    }
    const handleAddToCart = () => {
        const cartData = {
            userId: 1,
            products: [{ productId: Number(product.id) }]
        };
        addToCart(cartData);
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <div className="flex items-center justify-center h-64 mb-4">
                    <img src={product.image} alt={product.title} className="max-h-full object-contain" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{product.title}</h2>
                <div className="text-indigo-600 font-bold mb-4 text-xl">${product.price}</div>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="text-sm text-gray-500">
                    <span>Category: <span className="text-gray-700 font-medium">{product.category}</span></span>
                    <br />
                    <span>
                        Rating: <span className="text-yellow-500 font-medium">{product.rating?.rate}</span>
                        <span className="text-gray-400"> ({product.rating?.count})</span>
                    </span>
                </div>
                <button
                        className="bg-indigo-600 text-black px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                        onClick={handleAddToCart}
                        aria-label="Add product to cart"
                    >
                        Add to Cart
                    </button>
                    {/* <button
                        className="bg-red-600 text-black px-4 py-2 rounded-md hover:bg-red-700 transition ml-4"
                        aria-label="Buy product"
                    >
                        Buy
                    </button> */}
            </div>
           
        </div>

    );

}
export default ProductDetail;