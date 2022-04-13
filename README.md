# Bread Crumbs Dapp

Docker + Nginx + Yarn + Webpack + React + Elasticsearch

## Requirements

The following technologies are needed for working/deploying this project:

- [VS Code](https://code.visualstudio.com/download): For coding in both frontend and backend languages
- [GNU Make](https://www.gnu.org/software/make/): For executables and commands
- [Docker](https://docs.docker.com/): For deployments in isolated containers
- [Docker Compose](https://docs.docker.com/compose/install/): For deployments with multiple docker services

## Base folder structure

```bash
BreadCrumbsDapp/ # Repository & project name
  backend # Backend code (Truffle & Solidity)
  frontend # Frontend code (Next.js & React)
  deploy # Deployment code (Docker & Docker-Compose)
```

## Environments architecture

### Development

The local development stack is built by a composition of the following Docker services:

- Ganache
- Truffle
- Truffle-test
- Postgres
- PgAdmin

Frontend service is served with Next.js development server, but can also be served with a Docker service.

### Production

The production stack is built by a composition of the following Docker services:

- Ganache (Google Cloud)
- Truffle (Google Cloud)
- Postgres (Google Cloud)
- Prisma (Google Cloud)
- Frontend (Vercel platform)

## Environments setup

The [Makefile](Makefile) included in the base directory includes all the configurations and command short hands to build, run and deploy the project code. GNU make tool is used to excute described commands.

Frontend commands to build, test adn serve the website are located in [package.json](package.json) file.

### Local

#### Build

1. Build the local stack with all services (docker-compose based)

```bash
 make docker-build
```

or

```bash
 make docker-build ENV=local
```

#### Run

1. Edit local environment variables if needed:
   [.env.local](.env.local)

2. Run services (Ganache + Truffle + Postgres + PgAdmin) with Docker:

```bash
 make docker-up
```

or

```bash
 make docker-up ENV=local
```

3. Build and serve frontend service locally with hot reloading server:

```bash
 yarn start
```

#### Test

Unit tests are currently only developed for the backend. We will use a Ganache service over Docker to run a local blockchain and Truffle to launch the test suite.

1. Run services (Ganache + Truffle-Test) with Docker:

```bash
 make docker-test
```

or

```bash
 make docker-test ENV=local
```

#### Unmount

1. Shut down Docker services:

```bash
 make docker-down
```

or

```bash
 make docker-down ENV=local
```

2. Stop frontend server with ctrl/cmd + C on the terminal that is logging the service.

### Production (Google Cloud & Vercel)

#### Environments

Two different remote environments can be deployed on Google Cloud Compute Engine. Each of them is linked with a different Gitlab branch:

- **development**: Development environment and unit testing stage - [https://github.com/junqueror/BreadCrumbsDapp/tree/development](https://github.com/junqueror/BreadCrumbsDapp/tree/development)
- **production**: Production environment and public Dapp - [https://github.com/junqueror/BreadCrumbsDapp/tree/master](https://github.com/junqueror/BreadCrumbsDapp/tree/master)

Although there are differences between them, the commands for building the components and executing them are shared.
This way you can execute the same commands selecting the environment with the parameter `ENV={environment_name}`

#### Build

1. Build the production stack with all services (docker-compose based)

```bash
 make docker-build ENV=production
```

#### Push and pull Docker artifacts from Google registry

1. Push production images:

```bash
 make docker-push ENV=production
```

2. Pull production iamges (on Google Cloud VM):

```bash
 make docker-pull ENV=production
```

#### Run

- Deploy the production with all containerized services (on Google Cloud VM):

  ```bash
  make docker-up ENV=production
  ```

#### Unmount

1. Shut down containers of the production environment:
   ```bash
   make docker-down ENV=production
   ```

## Google Cloud production instance management

### Google Cloud SDK and CLI

Before start managing the project in Google Cloud with CLI commands you should set up your local configuration. Follow Google Cloud instructions for [installing Google Cloud CLI](https://cloud.google.com/sdk/gcloud#download_and_install_the).

### Google project specific commands

- **Config**: Configure your local config for Google Cloud CLI for this project

  ```bash
  make gcloud-set-config
  ```

- **Auth**: Authorize Docker for working with Google Cloud repository

  ```bash
  make gcloud-auth
  ```

- **List Artifacts**: List Docker artifacts on Google Cloud repository

  ```bash
  make gcloud-list-artifacts
  ```

- **SSH**: Starts an SSH connection and attaches a Shell terminal in the production VM on Google Cloud

  ```bash
  make gcloud-ssh
  ```

- **SCP push**: Push file or directory to production VM on Google Cloud

  ```bash
  make gcloud-scp-push FILE=[my-file]
  ```

- **SCP pull**: Pull file or directory from production VM on Google Cloud to local

  ```bash
  make gcloud-scp-pull FILE=[my-file]
  ```

## Clean up tools

- For cleaning Docker containers, images and volumes related with this project:

  ```bash
  make docker-clean
  ```

- For cleaning all Docker system, as it was just installed:

  ```bash
  make docker-prune
  ```
