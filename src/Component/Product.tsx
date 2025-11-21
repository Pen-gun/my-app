import '../App.css'
import { ProductHook } from '../Hooks/ProductHook';
import ProductDetail from './ProductDetail.page';
import React from 'react';


export default function Product(){
    
    const{ data: products, isLoading } = ProductHook();
    const[isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<any | null>(null);

    function handelOpen(product: any) {
      setSelected(product);
      setIsOpen(true);
    }
    function handelClose() {
      setIsOpen(false);
      setSelected(null);
    }

    return (
        <div className="min-h-screen bg-gray-550 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
                <div>Loading...</div>
            ) : (   
                products.map((product: any) => (
                <article key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col hover:cursor-pointer hover:scale-[1.02] hover:bg-gray-100"
                onClick={() => handelOpen(product)}
                role="button"
                style={{cursor: 'pointer'}}
                tabIndex={0}>
                <div className="flex items-center justify-center h-48 mb-4">
                    <img src={product.image} alt={product.title} className="max-h-full object-contain" />
                </div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 text-left">{product.title}</h2>
                    <p className="text-indigo-600 font-bold text-right">${product.price}</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 max-h-20 overflow-hidden text-justify">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                    <span>Category: <span className="text-gray-700 font-medium">{product.category}</span></span>
                    <span>
                    Rating: <span className="text-yellow-500 font-medium">{product.rating?.rate}</span>
                    <span className="text-gray-400"> ({product.rating?.count})</span>
                    </span>
                </div>
                </article>
            )))}
            </div>
            <ProductDetail isOpen={isOpen} onClose={handelClose} product={selected} />
        </div>
    );
}