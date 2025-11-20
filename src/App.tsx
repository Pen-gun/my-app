import './App.css'
import { Routes, Route } from 'react-router-dom'
import Initial from './Component/Initial'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import InsertProduct from './Component/InsertProduct'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LimitFetch from './Component/LimitFetch'
import AddNonUsers from './Component/AddNonUsers'
import CartPageWrapper from './Pages/CartPage'
import HomePage from './Pages/HomePage'
import LoginPageWrapper from'./Pages/LoginPage.page'
import UserPageWrapper from './Pages/UserPage.page'
import MainCart from './Component/Cart/MainCart'

const queryClient = new QueryClient()


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/initial" element={<Initial />} />
            <Route path="/products" element={<HomePage />} />
            <Route path="/insert-product" element={<InsertProduct />} />
            <Route path="/LimitFetch" element ={<LimitFetch initialLimit={5}/>} />
            <Route path="/notUsers" element ={<AddNonUsers />} />
            <Route path="/cart" element ={<CartPageWrapper />} />
            <Route path="/Users" element ={<UserPageWrapper />} />
            <Route path="/login" element ={<LoginPageWrapper />} />
            <Route path="/MainCart" element ={<MainCart />} />
          </Routes>
        </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
