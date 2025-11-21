import React, { useState, useRef, useEffect } from 'react'
import { useAuthHook } from '../Hooks/AuthHook'
import { useNavigate } from 'react-router-dom'
import { EyeClosed,EyeIcon } from 'lucide-react';

export default function LoginPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const { mutateAsync: login } = useAuthHook()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(null)

        if (!username.trim() || !password) {
            setFormError('Please enter both username and password.')
            return
        }

        try {
            setIsSubmitting(true)
            const res = await login({ username: username.trim(), password })
            console.log('login success', res)
            alert('Login Successful');
            navigate('/')
        } catch (err: any) {
            // show a friendly error message
            const message = err?.response?.data || err?.message || 'Login failed. Please try again.'
            setFormError(typeof message === 'string' ? message : JSON.stringify(message))
        } finally {
            setIsSubmitting(false)
        }
    }
    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign in to your account</h2>
                <p className="text-sm text-gray-500 mb-6">Welcome back  please enter your details.</p>

                {formError && (
                    <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-left font-medium text-gray-700 mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            placeholder="Username"
                            ref={inputRef}
                        />
                    </div>

                    <div>
                        <label className="block text-left font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeClosed /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between"> 
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer hover:scale-105 transition"
                        >
                            {isSubmitting ? (
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            ) : null}
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
