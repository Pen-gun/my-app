import { Link, useNavigate } from 'react-router-dom'
import { getUserFromToken } from './Cart/decodeJwt'
import { useLogout } from '../Hooks/AuthHook'

type NavLinksProps = {
  onClick?: () => void
}

export default function NavLinks({ onClick }: NavLinksProps) {
  const navigate = useNavigate()
  const logout = useLogout()
  // Determine display name from possible session storage formats
  let displayName: string | null = null

  try {
    const sd = sessionStorage.getItem('sessionData')
    if (sd) {
      // sessionData may be a JSON string containing { token, username }
      try {
        const parsed = JSON.parse(sd)
        if (parsed?.username) displayName = parsed.username
        if (!displayName && parsed?.token) {
          const u = getUserFromToken(parsed.token)
          if (u?.username) displayName = u.username
        }
      } catch {
        // not JSON, maybe a raw token
        const u = getUserFromToken(sd)
        if (u?.username) displayName = u.username
      }
    }

    if (!displayName) {
      const authToken = sessionStorage.getItem('authToken')
      if (authToken) {
        const u = getUserFromToken(authToken)
        if (u?.username) displayName = u.username
      }
    }

    if (!displayName) {
      const authUsername = sessionStorage.getItem('authUsername')
      if (authUsername) displayName = authUsername
    }
  } catch (e) {
    console.warn('NavLinks: failed to read session storage', e)
  }

  return (
    <div className='fixed top-5 z-[1000] space-x-4 bg-white/70 backdrop-blur-md px-4 py-2 rounded-md shadow-md'>
      <Link
        to="/"
        onClick={onClick}
        className="text-gray-700 hover:border-blue-600 px-3 py-2 rounded-md text-sm font-medium transition inline-block"
      >
        Home
      </Link>
      <Link
        to="/cart"
        onClick={onClick}
        className="text-gray-700 hover:border-blue-600 px-3 py-2 rounded-md text-sm font-medium transition inline-block"
      >
        Cart
      </Link>
      <Link
        to="/Users"
        onClick={onClick}
        className="text-gray-700 hover:border-blue-600 px-3 py-2 rounded-md text-sm font-medium transition inline-block"
      >
        {displayName ? `${displayName}` : 'Users'}
      </Link>
      {displayName ? (
        <button
          onClick={() => { logout(); navigate('/login') }}
          className='logout-button'>
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          onClick={onClick}
          className="text-gray-700 hover:border-blue-600 px-3 py-2 rounded-md text-sm font-medium transition inline-block"
        >
          Login
        </Link>
      )}
    </div>
  )
}
