# SCHEDULER.md

# Scheduler

# Objetivo

Serviço responsável por:

- atualização automática
- sincronização API
- fechamento de palpites
- atualização ranking

---

# Frequência

| Job | Frequência |
|---|---|
| atualizar jogos | 5 min |
| atualizar ranking | 5 min |
| fechar palpites | 1 min |

---

# Estrutura

```text
scheduler/
├── jobs/
└── scheduler.py
```

---