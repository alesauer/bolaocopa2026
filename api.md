# API.md

# API REST

# Auth

## POST /auth/register

### Body

```json
{
  "nome": "Alexandre",
  "email": "alex@email.com",
  "senha": "123456"
}
```

---

## POST /auth/login

### Body

```json
{
  "email": "alex@email.com",
  "senha": "123456"
}
```

---

# Jogos

## GET /jogos

Lista jogos.

---

## GET /jogos/:id

Detalhes de partida.

---

# Palpites

## POST /palpites

### Body

```json
{
  "jogo_id": 1,
  "gols_casa": 2,
  "gols_fora": 1
}
```

---

## PUT /palpites/:id

Atualiza palpite.

---

# Ranking

## GET /ranking

Retorna ranking geral.

---
