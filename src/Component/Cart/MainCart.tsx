import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserFromToken } from './decodeJwt'


async function resolveCurrentUserId(): Promise<number | null> {
  // Try sessionData.token, authToken, then fallback to stored username
  let storedUsername: string | null = sessionStorage.getItem('authUsername') || null

  try {
    const sd = sessionStorage.getItem('sessionData')
    if (sd) {
      const parsed = JSON.parse(sd)
      // prefer token from sessionData
      const result = getUserFromToken(parsed?.token ?? parsed)
      if (result.id) return result.id
      storedUsername = storedUsername ?? parsed?.username ?? storedUsername
    }
  } catch (e) {
    console.warn('mainCart: failed to parse sessionData', e)
  }

  const rawAuth = sessionStorage.getItem('authToken')
  if (rawAuth) {
    const result = getUserFromToken(rawAuth)
    if (result.id) return result.id
  }

  // fallback: username lookup
  if (storedUsername) {
    const { data: users } = await axios.get('https://fakestoreapi.com/users')
    const me = (users as any[]).find((u) => u.username === storedUsername)
    if (me) return me.id
  }

  return null
}

type CartItem = {
  id: number
  title: string
  price: number
  image?: string
  quantity: number
}
const MainCart = () => {
  const queryClient = useQueryClient()

  const [userId, setUserId] = useState<number | null>(null)
  const [resolvingUser, setResolvingUser] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const id = await resolveCurrentUserId()
      if (!cancelled) setUserId(id)
      if (!cancelled) setResolvingUser(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const cartsQuery = useQuery({
    queryKey: ['carts', userId],
    queryFn: async () => {
      if (!userId) return [] as any[]
      const { data } = await axios.get(`https://fakestoreapi.com/carts/user/${userId}`)
      return data
    },
    enabled: !!userId,
  })

  const mostRecentCart = useMemo(() => {
    const carts = cartsQuery.data as any[] | undefined
    if (!carts || carts.length === 0) return null
    return carts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  }, [cartsQuery.data])

  const itemsQuery = useQuery({
    queryKey: ['cart-items', mostRecentCart?.id],
    queryFn: async () => {
      if (!mostRecentCart) return [] as CartItem[]
      const products = Array.isArray(mostRecentCart.products) ? mostRecentCart.products : []
      const promises = products.map(async (p: any) => {
        const prod = await queryClient.fetchQuery({
          queryKey: ['product', p.productId],
          queryFn: async () => {
            const { data } = await axios.get(`https://fakestoreapi.com/products/${p.productId}`)
            return data
          },
        })
        return {
          id: prod.id,
          title: prod.title,
          price: prod.price,
          image: prod.image,
          quantity: p.quantity,
        } as CartItem
      })
      return Promise.all(promises)
    },
    enabled: !!mostRecentCart?.id,
  })

  const total = (itemsQuery.data ?? []).reduce((sum: number, it: CartItem) => sum + (it.price || 0) * (it.quantity || 0), 0)


  if (resolvingUser || cartsQuery.isLoading || itemsQuery.isLoading) return <div className="p-4">Loading cart…</div>
  if (!userId) return <div className="pt-50 text-gray-600 text-center">No logged-in user found. Please login to see your cart.</div>
  if (cartsQuery.isError) return <div className="p-4 text-red-600">Failed to load carts</div>
  if (itemsQuery.isError) return <div className="p-4 text-red-600">Failed to load cart items</div>

  const items = itemsQuery.data ?? []

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-semibold">My Cart</h2>
          {mostRecentCart && (
            <div className="text-sm text-gray-500">Cart #{mostRecentCart.id} • {new Date(mostRecentCart.date).toLocaleString()}</div>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 rounded p-8 text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="bg-white shadow-sm rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-20 flex-shrink-0 flex items-center justify-center">
                {it.image ? (
                  <img src={it.image} alt={it.title} className="w-16 h-16 object-contain" />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-md" />
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-800">{it.title}</div>
                    <div className="text-sm text-gray-500">Quantity: {it.quantity}</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">${(it.price * it.quantity).toFixed(2)}</div>
                </div>
                <div className="mt-2 text-sm text-gray-600">Unit price: ${it.price.toFixed(2)}</div>
              </div>
            </div>
          ))}

          <div className="bg-white p-4 rounded-md flex flex-col sm:flex-row items-center justify-between shadow-sm">
            <div className="text-sm text-gray-600">Items: <span className="font-medium text-gray-800">{items.length}</span></div>
            <div className="mt-3 sm:mt-0 text-right">
              <div className="text-lg text-gray-600">Total</div>
              <div className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default MainCart
