import { useState } from 'react'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const signIn = async () => {
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
      localStorage.setItem('Bearer', data.token)
      setMessage(`✅Authorized successfuly`)
    } catch (err) {
      setMessage(`⛔Something went wrong: ${err.message}`)
    }
  }

  return (
    <>
      <form action={signIn}>
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

      {message && <p>{message}</p>}
    </>
  )
}
