import React, { useState } from 'react'
import { magic } from './Magic'

function Login({onLoginSuccess, mode = "login" }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // 使用 Magic 登录链接发送到用户的邮箱
            await magic.auth.loginWithMagicLink({ email });
            onLoginSuccess(); // 通知父组件登录成功
          } catch (err) {
            setError(`${mode === "login" ? "Login" : "Sign up"} failed, please try again`);
          } finally {
            setIsLoading(false);
          }
        };
    return (
        <div className="login-container">
            <h2 className="text-center text-2xl font-semibold mb-4">
                {mode === "login" ? "Log In" : "Sign Up"}
            </h2>
        <form onSubmit={handleLogin}>
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
            required
            />
            <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
            disabled={isLoading}
            >
            {isLoading ? (mode === "login" ? "Logging in..." : "Signing up...") : (mode === "login" ? "Log In" : "Sign Up")}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        </div>
    );
    }

export default Login