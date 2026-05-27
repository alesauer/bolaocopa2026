# DATABASE.md

# Estrutura do Banco de Dados

# usuarios

| Campo | Tipo |
|---|---|
| id | INTEGER |
| nome | TEXT |
| email | TEXT |
| senha | TEXT |
| admin | BOOLEAN |

---

# jogos

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

# palpites

| Campo | Tipo |
|---|---|
| id | INTEGER |
| usuario_id | INTEGER |
| jogo_id | INTEGER |
| gols_casa | INTEGER |
| gols_fora | INTEGER |

---

# ranking

| Campo | Tipo |
|---|---|
| id | INTEGER |
| usuario_id | INTEGER |
| pontos | INTEGER |

---

# Relacionamentos

```text
usuarios 1:N palpites
jogos 1:N palpites
usuarios 1:1 ranking
```
