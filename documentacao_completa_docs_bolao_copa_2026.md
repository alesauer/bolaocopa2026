# README.md

# Bolão Copa 2026

Sistema web de bolão da Copa do Mundo 2026 desenvolvido com foco em:

- simplicidade
- baixo custo
- escalabilidade gradual
- arquitetura modular
- deploy simplificado

---

# Stack Principal

| Camada | Tecnologia |
|---|---|
| Frontend | React |
| Backend | Flask |
| Banco | SQLite |
| Auth | JWT |
| Scheduler | APScheduler |
| Infra | Docker + VPS |
| Proxy | Nginx |

---

# Funcionalidades

- autenticação JWT
- cadastro de usuários
- palpites
- ranking automático
- atualização automática de jogos
- grupos e classificação
- painel administrativo
- integração com APIs de futebol

---

# Estrutura do Projeto

```text
frontend/
backend/
nginx/
data/
docs/
```

---

# Como Executar

## Subir containers

```bash
docker-compose up -d
```

---

## Derrubar containers

```bash
docker-compose down
```

---

# Variáveis de Ambiente

```env
SECRET_KEY=
JWT_SECRET_KEY=
API_FOOTBALL_KEY=
```

