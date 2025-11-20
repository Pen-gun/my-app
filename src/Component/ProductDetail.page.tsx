import { ProductIdHook } from '../Hooks/ProductIdHook';
import { useAddToCart } from '../Hooks/CartHook';
import { useEffect } from 'react';
import {createPortal} from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    // optional: pass a product object when rendering as a modal
    product?: any;
}

const ProductDetail = ({isOpen, onClose, product: productProp}: ModalProps) => {
    const { mutate: addToCart } = useAddToCart();
    const fetchId = productProp?.id ?? 0;
    const { data: product, isLoading } = ProductIdHook(Number(fetchId));

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        if (isOpen) {
            document.body.style.overflow = "hidden";  
            document.addEventListener("keydown", onKey);  
        }

        return () => {
            document.body.style.overflow = "auto";        // restore scroll
            document.removeEventListener("keydown", onKey); // cleanup
        };

    }, [isOpen, onClose]);

    const handleAddToCart = () => {
        const cartData = {
            userId: 1,
            products: [{ productId: Number((productProp ?? product)?.id) }]
        };
        addToCart(cartData);
    };

    if (isLoading) {
        return null;
    }

    if (!isOpen) return null;

    const displayed = productProp ?? product;

    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            onClick={onClose} // Close when clicking outside
        >
            <div
                className="bg-white rounded-lg shadow-md p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex items-center justify-center h-64 mb-4">
                    <img src={displayed?.image} alt={displayed?.title} className="max-h-full object-contain" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{displayed?.title}</h2>
                <div className="text-indigo-600 font-bold mb-4 text-xl">${displayed?.price}</div>

                <p className="text-gray-700 mb-4">{displayed?.description}</p>

                <div className="text-sm text-gray-500">
                    <span>Category: <span className="text-gray-700 font-medium">{displayed?.category}</span></span>
                    <br />
                    <span>
                        Rating:
                        <span className="text-yellow-500 font-medium">{displayed?.rating?.rate}</span>
                        <span className="text-gray-400"> ({displayed?.rating?.count})</span>
                    </span>
                </div>

                <button
                    className="bg-indigo-600 text-black px-4 py-2 mt-4 rounded-md hover:bg-indigo-700 transition"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>,
        document.body
    );

}
export default ProductDetail;