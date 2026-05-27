# Requisitos Funcionais e Não Funcionais — Sistema de Bolão Copa do Mundo 2026

# Objetivo do Sistema

O sistema tem como objetivo permitir a criação e gerenciamento de um bolão online da Copa do Mundo 2026, possibilitando que usuários realizem palpites em partidas e acompanhem rankings em tempo real.

---

# Requisitos Funcionais

## RF01 — Cadastro de Usuários

O sistema deve permitir o cadastro de novos usuários contendo:

- nome
- e-mail
- senha

### Regras

- e-mail deve ser único
- senha deve ser armazenada criptografada

---

## RF02 — Autenticação de Usuários

O sistema deve permitir login utilizando:

- e-mail
- senha

### Regras

- autenticação baseada em JWT
- sessões protegidas
- geração de access token

---

## RF03 — Recuperação de Sessão

O sistema deve permitir que o usuário mantenha a sessão autenticada utilizando token válido.

---

## RF04 — Visualização de Jogos

O sistema deve permitir que usuários visualizem:

- jogos da Copa
- data e horário
- fase da competição
- grupos
- placares
- status da partida

---

## RF05 — Cadastro de Palpites

O sistema deve permitir que usuários realizem palpites para partidas.

### Dados do palpite

- gols time da casa
- gols time visitante

### Regras

- um único palpite por usuário por jogo
- palpites só podem ser realizados antes do início da partida

---

## RF06 — Edição de Palpites

O sistema deve permitir edição de palpites antes do início da partida.

---

## RF07 — Bloqueio de Palpites

O sistema deve bloquear automaticamente novos palpites e edições após o início da partida.

---

## RF08 — Atualização Automática de Jogos

O sistema deve atualizar automaticamente:

- placares
- status das partidas
- fases da competição

utilizando APIs externas.

---

## RF09 — Cálculo Automático de Pontuação

O sistema deve calcular automaticamente a pontuação dos usuários.

### Regras iniciais

| Evento | Pontuação |
|---|---|
| Acerto do vencedor | 3 |
| Acerto do empate | 4 |
| Acerto do placar exato | 5 |

---

## RF10 — Ranking Geral

O sistema deve apresentar ranking geral contendo:

- posição
- nome do usuário
- pontuação total

---

## RF11 — Visualização de Classificação dos Grupos

O sistema deve exibir classificação atualizada dos grupos da Copa.

---

## RF12 — Área Administrativa

O sistema deve possuir área administrativa para:

- sincronização manual dos jogos
- gerenciamento de usuários
- recalcular ranking
- atualizar partidas

---

## RF13 — Controle de Permissões

O sistema deve diferenciar:

- usuários comuns
- administradores

---

## RF14 — Integração com API Externa

O sistema deve integrar-se com APIs externas para obtenção de:

- partidas
- resultados
- classificações
- seleções

---

## RF15 — Responsividade

O sistema deve funcionar corretamente em:

- desktop
- tablet
- dispositivos móveis

---

## RF16 — Logout

O sistema deve permitir encerramento da sessão autenticada.

---

# Requisitos Não Funcionais

## RNF01 — Performance

O sistema deve responder requisições em até:

- 2 segundos para operações comuns
- 5 segundos para atualização de rankings

---

## RNF02 — Disponibilidade

O sistema deve possuir disponibilidade mínima de:

- 95%

---

## RNF03 — Segurança

O sistema deve:

- utilizar HTTPS
- proteger rotas autenticadas
- armazenar senhas criptografadas
- validar tokens JWT

---

## RNF04 — Escalabilidade

A arquitetura deve permitir futura migração para:

- PostgreSQL
- Redis
- FastAPI
- WebSocket

sem necessidade de reescrita completa.

---

## RNF05 — Manutenibilidade

O sistema deve seguir arquitetura modular utilizando:

- Flask Blueprints
- separação de responsabilidades
- serviços desacoplados

---

## RNF06 — Portabilidade

O sistema deve ser executável em qualquer ambiente compatível com Docker.

---

## RNF07 — Backup

O sistema deve permitir backup simples do banco SQLite.

---

## RNF08 — Persistência

O banco de dados deve permanecer persistente mesmo após reinicialização dos containers.

---

## RNF09 — Compatibilidade

O sistema deve ser compatível com navegadores modernos:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

---

## RNF10 — Baixo Custo Operacional

A arquitetura deve minimizar custos de infraestrutura utilizando:

- SQLite
- VPS única
- Docker
- APIs gratuitas

---

## RNF11 — Monitoramento

O sistema deve possuir logs básicos de:

- autenticação
- falhas de integração
- erros da aplicação
- execução do scheduler

---

## RNF12 — Atualização Automática

O scheduler deve executar tarefas automáticas sem intervenção manual.

---

## RNF13 — Isolamento de Serviços

Os serviços da aplicação devem operar de forma isolada em containers separados.

---

## RNF14 — Facilidade de Deploy

A aplicação deve permitir deploy simplificado utilizando Docker Compose.

---

## RNF15 — Organização do Código

A aplicação deve seguir estrutura organizada baseada em:

- modularização
- separação por domínio
- padronização de código

---

# Regras de Negócio

## RN01 — Limite de Palpite

Cada usuário poderá possuir apenas um palpite por partida.

---

## RN02 — Fechamento de Palpites

Palpites serão encerrados automaticamente no horário de início da partida.

---

## RN03 — Ranking

O ranking deve ser atualizado automaticamente após finalização de partidas.

---

## RN04 — Integridade dos Dados

Usuários não poderão alterar resultados oficiais das partidas.

---

## RN05 — Administração

Somente administradores poderão:

- sincronizar jogos
- atualizar partidas
- recalcular pontuações
- acessar área administrativa

---

# Requisitos Futuros

## RFUT01 — Notificações

Envio de notificações sobre:

- início de jogos
- fechamento de palpites
- atualização do ranking

---

## RFUT02 — Ranking em Tempo Real

Atualização em tempo real utilizando WebSocket.

---

## RFUT03 — Login Social

Autenticação via:

- Google
- GitHub

---

## RFUT04 — Aplicativo Mobile

Disponibilização futura de aplicativo mobile.

---

## RFUT05 — Criação de Ligas

Usuários poderão criar grupos privados de bolão.

---

# Considerações Finais

Os requisitos apresentados definem uma base sólida para construção de um sistema de bolão online simples, moderno e escalável, permitindo evolução gradual da plataforma conforme aumento do número de usuários e funcionalidades.

