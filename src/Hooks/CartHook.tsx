import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export type CartCreate = { userId: number; products: { productId: number }[] }
export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation<any, unknown, CartCreate>({
        mutationKey:['add-cart'],
        mutationFn: async (cart: CartCreate) =>{
            const res= await axios.post('https://fakestoreapi.com/carts', cart);
            console.log('Add to cart response:', res.data);
            return res.data;
        },
        onSuccess:() =>{
            alert('Product added to cart successfully!');
            queryClient.invalidateQueries({queryKey: ['carts']});
        }
    })
    // const cart = { userId: 1, products: [{ id: 1 }] };
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<any, unknown, any>({
        mutationKey:['update-cart'],
        mutationFn: async (cart: any) =>{
            const res= await axios.put('https://fakestoreapi.com/carts/1', cart);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['carts']});
        }
    })
    // const cart = { userId: 1, products: [{ id: 2 }] };
};

export function useDeleteProduct() {
    return useMutation<any, unknown, number>({
        mutationFn: async (cartId: number) => {
            const response = await axios.delete(`https://fakestoreapi.com/carts/${cartId}`)
            return response.data
        },
    })
}
