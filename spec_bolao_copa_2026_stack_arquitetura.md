# Especificação Técnica — Bolão Copa do Mundo 2026

## Objetivo

Desenvolver uma aplicação web de bolão da Copa do Mundo 2026 com foco em:

- simplicidade
- baixo custo operacional
- rápida entrega
- arquitetura escalável
- fácil manutenção

A aplicação permitirá:

- cadastro de usuários
- autenticação JWT
- cadastro de palpites
- ranking automático
- atualização de jogos
- classificação por grupos
- administração do sistema

---

# Stack de Tecnologia

## Frontend

### React
Responsável pela interface da aplicação.

### Bibliotecas sugeridas

| Biblioteca | Objetivo |
|---|---|
| React Router | Rotas SPA |
| Axios | Consumo da API |
| Tailwind CSS | Estilização |
| React Query (opcional) | Cache e sincronização |

---

## Backend

### Python
Linguagem principal da aplicação.

### Flask
Framework responsável pela API REST.

### Flask Extensions

| Biblioteca | Objetivo |
|---|---|
| Flask-JWT-Extended | Autenticação JWT |
| Flask-SQLAlchemy | ORM |
| Flask-CORS | Controle de CORS |
| bcrypt | Hash de senhas |

---

## Banco de Dados

### SQLite
Banco principal da aplicação.

### Motivos da escolha

- simples
- rápido
- sem necessidade de servidor dedicado
- excelente para MVP
- baixo custo operacional
- fácil backup

---

## Scheduler Assíncrono

### APScheduler
Serviço separado responsável por tarefas automáticas.

### Responsabilidades

- atualização dos jogos
- sincronização com APIs externas
- atualização de rankings
- fechamento automático de palpites
- atualização das fases da competição

---

## Containerização

### Docker
Toda a aplicação será executada em containers.

### Docker Compose
Responsável pela orquestração dos serviços.

---

## Infraestrutura

### VPS Linux
Hospedagem principal da aplicação.

### Servidor Web
Nginx como proxy reverso.

### HTTPS
Let's Encrypt + Certbot.

---

# Arquitetura da Aplicação

```text
Internet
   ↓
Nginx Reverse Proxy
   ↓
Frontend React
   ↓
Flask API
   ↓
SQLite

Scheduler Worker
   ↓
API Futebol
```

---

# Estrutura de Diretórios

```text
project/
│
├── frontend/
│
├── backend/
│   ├── app/
│   │   ├── blueprints/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── extensions/
│   │   └── config/
│   │
│   ├── scheduler/
│   │   ├── jobs/
│   │   └── scheduler.py
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── run.py
│
├── nginx/
│
├── data/
│   └── bolao.db
│
├── docker-compose.yml
│
└── .env
```

---

# Arquitetura Backend

## Blueprints

### auth
Responsável por:

- login
- cadastro
- refresh token
- autenticação JWT

---

### jogos
Responsável por:

- listagem de partidas
- grupos
- classificação
- resultados

---

### palpites
Responsável por:

- cadastro de palpites
- edição de palpites
- consulta de palpites

---

### ranking
Responsável por:

- ranking geral
- pontuação
- classificação dos usuários

---

### admin
Responsável por:

- importação de jogos
- sincronização manual
- recalcular ranking
- administração do sistema

---

# Modelagem Inicial do Banco

## usuarios

| Campo | Tipo |
|---|---|
| id | INTEGER |
| nome | TEXT |
| email | TEXT |
| senha | TEXT |
| admin | BOOLEAN |

---

## jogos

| Campo | Tipo |
|---|---|
| id | INTEGER |
| time_casa | TEXT |
| time_fora | TEXT |
| data_jogo | DATETIME |
| gols_casa | INTEGER |
| gols_fora | INTEGER |
| status | TEXT |

---

## palpites

| Campo | Tipo |
|---|---|
| id | INTEGER |
| usuario_id | INTEGER |
| jogo_id | INTEGER |
| gols_casa | INTEGER |
| gols_fora | INTEGER |

---

## ranking

| Campo | Tipo |
|---|---|
| id | INTEGER |
| usuario_id | INTEGER |
| pontos | INTEGER |

---

# Fluxo de Atualização dos Jogos

## Scheduler

O scheduler executará periodicamente:

```text
1. Consulta API Futebol
2. Busca partidas atualizadas
3. Atualiza SQLite
4. Recalcula ranking
5. Atualiza frontend
```

---

# Regras de Pontuação

| Evento | Pontos |
|---|---|
| Acertou vencedor | 3 |
| Acertou empate | 4 |
| Acertou placar exato | 5 |

---

# Segurança

## Autenticação

JWT com access token.

---

## Senhas

Hash utilizando bcrypt.

---

## CORS

Controle de origens autorizadas.

---

## HTTPS

Toda comunicação protegida via TLS.

---

# Estratégia de Deploy

## Containers

| Serviço | Responsabilidade |
|---|---|
| frontend | Interface React |
| backend | API Flask |
| scheduler | Atualizações automáticas |
| nginx | Proxy reverso |

---

# Estratégia de Backup

Backup automático diário do arquivo:

```text
/data/bolao.db
```

---

# Melhorias Futuras

## Possíveis Evoluções

- PostgreSQL
- Redis
- WebSocket
- Notificações push
- OAuth Login
- Ranking realtime
- Aplicativo mobile
- Painel administrativo avançado

---

# APIs Externas

## APIs sugeridas

| API | Objetivo |
|---|---|
| API-Football | Jogos e resultados |
| football-data.org | Dados alternativos |
| TheSportsDB | Imagens e escudos |
| OpenFootball JSON | Backup local |

---

# Considerações Finais

A arquitetura proposta foi definida priorizando:

- simplicidade
- baixo custo
- velocidade de desenvolvimento
- facilidade de manutenção
- possibilidade de evolução futura

A stack atende perfeitamente um projeto de bolão pequeno ou médio, permitindo crescimento gradual sem necessidade de reescrita completa da aplicação.

