import axios from 'axios';
import {useQuery,useMutation, useQueryClient} from '@tanstack/react-query';
//updatemm

export const GetAllUsers = async () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res= await axios.get('https://fakestoreapi.com/users');
            return res.data;
        }
    })
}

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['add-user'],
        mutationFn: async (user) =>{
            const res= await axios.post('https://fakestoreapi.com/users', user);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    })
}
export const GetSingleUser = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () =>{
            const res = await axios.get(`https://fakestoreapi.com/users/${id}`);
            return res.data;
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['update-user'],
        mutationFn: async (user: { username: string; email: string; password: string }) =>{
            const res = await axios.put('https://fakestoreapi.com/users/1', user);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    })
}
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation<any, unknown, number>({
        mutationKey:['delete-user'],
        mutationFn: async (id) =>{
            const res= await axios.delete(`https://fakestoreapi.com/users/${id}`);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    })
}