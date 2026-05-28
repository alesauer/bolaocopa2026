import React, { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const apiBase = '/api'

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PrimaryNav({ items }) {
  return (
    <nav className="nav-grid" aria-label="Navegação principal">
      {items.map((item) => (
        <a
          key={item.to}
          className={item.active ? 'nav-card nav-card-active' : 'nav-card'}
          href={item.to}
        >
          <span>{item.label}</span>
          <span className={item.status === 'ativo' ? 'badge badge-active' : 'badge'}>{item.status}</span>
        </a>
      ))}
    </nav>
  )
}

function Dashboard({ token, user, onLogout }) {
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

  const navItems = [
    { to: '/', label: 'Dashboard', status: 'ativo', active: true },
    { to: '/jogos', label: 'Jogos', status: 'ativo', active: false },
    { to: '#', label: 'Ranking', status: 'em breve', active: false },
    { to: '#', label: 'Palpites', status: 'em breve', active: false },
  ]

  return (
    <main className="page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Painel inicial</p>
          <h1>Bolão Copa 2026</h1>
          <p className="hero-copy">Sua área autenticada está pronta. Agora a base do projeto já tem navegação inicial para os próximos módulos do bolão.</p>
        </div>
        <div className="hero-side">
          <span className="badge badge-highlight">Online</span>
          <p><strong>Usuário:</strong> {user?.nome || 'Não identificado'}</p>
          <button className="secondary-button" onClick={onLogout}>Sair</button>
        </div>
      </section>

      <PrimaryNav items={navItems} />

      <section className="dashboard-grid">
        <article className="panel-card">
          <h2>Resumo rápido</h2>
          <p>Você já pode autenticar, encerrar sessão e validar o acesso protegido do sistema.</p>
          <ul className="feature-list">
            <li>Autenticação JWT ativa</li>
            <li>Frontend servido pelo nginx</li>
            <li>Backend e scheduler separados</li>
          </ul>
        </article>

        <article className="panel-card">
          <h2>Próximos módulos</h2>
          <div className="module-list">
            <div className="module-item">
              <span>Jogos</span>
              <span className="badge badge-active">Disponível</span>
            </div>
            <div className="module-item">
              <span>Ranking</span>
              <span className="badge">Em breve</span>
            </div>
            <div className="module-item">
              <span>Palpites</span>
              <span className="badge">Em breve</span>
            </div>
          </div>
        </article>

        <article className="panel-card panel-card-wide">
          <h2>Status técnico</h2>
          <p>Use este bloco para confirmar que o token atual consegue acessar a rota protegida do backend.</p>
          <div className="actions">
            <button onClick={loadProtected}>Testar rota protegida</button>
          </div>
          {message && <p className="success">{message}</p>}
        </article>
      </section>
    </main>
  )
}

function GamesPage({ token, user, onLogout }) {
  const [games, setGames] = useState([])
  const [error, setError] = useState('')
  const [selectedGame, setSelectedGame] = useState(null)

  const navItems = [
    { to: '/', label: 'Dashboard', status: 'ativo', active: false },
    { to: '/jogos', label: 'Jogos', status: 'ativo', active: true },
    { to: '#', label: 'Ranking', status: 'em breve', active: false },
    { to: '#', label: 'Palpites', status: 'em breve', active: false },
  ]

  React.useEffect(() => {
    async function loadGames() {
      const response = await fetch(`${apiBase}/jogos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Erro ao carregar jogos')
        return
      }

      setGames(data)
      if (data.length > 0) {
        setSelectedGame(data[0])
      }
    }

    loadGames()
  }, [])

  function formatDate(value) {
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className="page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Jogos</p>
          <h1>Partidas da Copa</h1>
          <p className="hero-copy">Visualize os jogos já disponíveis no sistema com data, status e placar quando houver resultado.</p>
        </div>
        <div className="hero-side">
          <span className="badge badge-highlight">{games.length} jogos</span>
          <p><strong>Usuário:</strong> {user?.nome || 'Não identificado'}</p>
          <button className="secondary-button" onClick={onLogout}>Sair</button>
        </div>
      </section>

      <PrimaryNav items={navItems} />

      {error && <p className="error page-message">{error}</p>}

      <section className="dashboard-grid">
        <article className="panel-card panel-card-wide">
          <h2>Lista de jogos</h2>
          <div className="games-list">
            {games.map((game) => (
              <button
                key={game.id}
                type="button"
                className={selectedGame?.id === game.id ? 'game-card game-card-active' : 'game-card'}
                onClick={() => setSelectedGame(game)}
              >
                <div>
                  <strong>{game.time_casa} x {game.time_fora}</strong>
                  <p>{formatDate(game.data_jogo)}</p>
                </div>
                <span className={game.status === 'finalizado' ? 'badge badge-active' : 'badge'}>{game.status}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-wide">
          <h2>Detalhes da partida</h2>
          {selectedGame ? (
            <div className="game-detail">
              <p><strong>Confronto:</strong> {selectedGame.time_casa} x {selectedGame.time_fora}</p>
              <p><strong>Data:</strong> {formatDate(selectedGame.data_jogo)}</p>
              <p><strong>Status:</strong> {selectedGame.status}</p>
              <p><strong>Placar:</strong> {selectedGame.gols_casa ?? '-'} x {selectedGame.gols_fora ?? '-'}</p>
            </div>
          ) : (
            <p>Nenhum jogo disponível.</p>
          )}
        </article>
      </section>
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
    <main className="container auth-container">
      <p className="eyebrow">Acesso</p>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className="form">
        {title === 'Cadastro' && (
          <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} />
        <button type="submit">{buttonLabel}</button>
      </form>
      <div className="auth-links">
        {title === 'Login' ? (
          <a href="/cadastro">Criar conta</a>
        ) : (
          <a href="/login">Já tenho conta</a>
        )}
      </div>
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
            <Dashboard token={authState.token} user={authState.user} onLogout={logout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/jogos"
        element={
          authState.token ? (
            <GamesPage token={authState.token} user={authState.user} onLogout={logout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}
