# ADR-001-use-sqlite.md

# ADR 001 — Uso do SQLite

# Contexto

Projeto pequeno/médio com baixo custo.

---

# Decisão

Utilizar SQLite como banco principal.

---

# Motivos

- simplicidade
- rapidez
- zero configuração
- baixo custo

---

# Consequências

- limitação de concorrência alta
- excelente para MVP

---

# ADR-002-use-flask.md

# ADR 002 — Uso do Flask

# Contexto

Necessidade de API simples e modular.

---

# Decisão

Utilizar Flask com Blueprints.

---

# Motivos

- simplicidade
- produtividade
- ecossistema maduro
- baixo overhead

---

# Consequências

- menor performance async comparado ao FastAPI
- ótima produtividade para MVP

