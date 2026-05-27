# DEPLOY.md

# Deploy VPS

# Requisitos

- Docker
- Docker Compose
- domínio
- VPS Linux

---

# Instalação

## Clonar projeto

```bash
git clone https://github.com/alesauer/bolaocopa2026.git
```

---

## Subir ambiente

```bash
docker-compose up -d --build
```

---

# HTTPS

## Certbot

```bash
sudo certbot --nginx
```

---

# Backup

## SQLite

```bash
cp data/bolao.db backup/
```