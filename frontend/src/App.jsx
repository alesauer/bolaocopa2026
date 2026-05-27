import React, { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const apiBase = '/api'

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function Home({ token, user, onLogout }) {
  const [message, setMessage] = useState('')

  async function loadProtected() {
    const response = await fetch(`${apiBase}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setMessage(data.message || 'ok')
  }

  return (
    <main className="container">
      <h1>Bolão Copa 2026</h1>
      <p>Base inicial do projeto.</p>
      <p><strong>Usuário:</strong> {user?.nome || 'Não identificado'}</p>
      <div className="actions">
        <button onClick={loadProtected}>Testar rota protegida</button>
        <button onClick={onLogout}>Sair</button>
      </div>
      {message && <p className="success">{message}</p>}
    </main>
  )
}

function AuthForm({ title, buttonLabel, onSubmit, error }) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSubmit(form)
  }

  return (
    <main className="container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="form">
        {title === 'Cadastro' && (
          <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} />
        <button type="submit">{buttonLabel}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </main>
  )
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [error, setError] = useState('')

  const authState = useMemo(() => ({ token, user }), [token, user])

  async function register(form) {
    setError('')
    const response = await fetch(`${apiBase}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      const data = await response.json()
      setError(data.message || 'Erro ao cadastrar')
      return
    }

    window.location.href = '/login'
  }

  async function login(form) {
    setError('')
    const response = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, senha: form.senha }),
    })

    const data = await response.json()
    if (!response.ok) {
      setError(data.message || 'Erro ao autenticar')
      return
    }

    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setToken(data.access_token)
    setUser(data.user)
    window.location.href = '/'
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken('')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <Routes>
      <Route path="/login" element={<AuthForm title="Login" buttonLabel="Entrar" onSubmit={login} error={error} />} />
      <Route path="/cadastro" element={<AuthForm title="Cadastro" buttonLabel="Cadastrar" onSubmit={register} error={error} />} />
      <Route
        path="/"
        element={
          authState.token ? (
            <Home token={authState.token} user={authState.user} onLogout={logout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}
