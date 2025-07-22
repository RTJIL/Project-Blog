import { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'

export default function LogIn({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const logIn = async () => {
    try {
      const res = await fetch(
        'http://localhost:3000/api.odin.blog/v1/auth/log-in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          mode: 'cors',
        }
      )

      //✅Authorized successfuly, your token: ${token}

      if (!res.ok) throw new Error('server error')

      const data = await res.json()
      onLoginSuccess(data.token)
    } catch (err) {
      setMessage(`⛔Something went wrong: ${err.message}`)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form action={logIn} className={styles.form}>
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
        <button type="submit">Log in</button>
      </form>

      <Link to={'/register'} className={styles.register}>
        Register
      </Link>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}
