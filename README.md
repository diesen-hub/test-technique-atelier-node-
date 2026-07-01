# Atelier Node API

API REST de gestion de joueurs de tennis en **Node.js / Express / TypeScript**, architecturée en **Clean Architecture**.

## Prérequis

- [Node.js 24](https://nodejs.org/)
  - macOS / Linux : [nvm](https://github.com/nvm-sh/nvm)
  - Windows : [nvm-windows](https://github.com/coreybutler/nvm-windows)
- [Docker](https://www.docker.com/) & Docker Compose

## Installation

```bash
# macOS / Linux
nvm use
npm install

# Windows
nvm use 24
npm install
```

## Lancer l'application

### En local (dev)

```bash
npm run dev
```

### Avec Docker

```bash
docker compose up --build
```

L'API est disponible sur `http://localhost:3000`.

## Documentation API

Swagger UI disponible sur `http://localhost:3000/docs/` une fois l'application lancée.

## Tests

```bash
# Exécution unique
npm test

# Mode watch
npm run test:watch

# Avec rapport de couverture
npm run test:coverage
```
