import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../login/Login.module.css'
import { buildApiUrl } from '/src/utils/api.js'

export default function Register({ onRegisterSuccess, baseUrl }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const register = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(
        buildApiUrl(`/api.odin.blog/v1/auth/register`, baseUrl),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          mode: 'cors',
        }
      )

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Registration failed')
      }

      const data = await res.json()
      setMessage('✅ Registered successfully! You can now log in.')
      onRegisterSuccess?.(data.token)
    } catch (err) {
      setMessage(`⛔ ${err.message}`)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={register} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <Link to={'/login'} className={styles.register}>
        Login
      </Link>

      {message && <p>{message}</p>}
    </div>
  )
}
