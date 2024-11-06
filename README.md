# GX Nuxt Portfolio

This is a portfolio repository regarding [Nuxt 3](https://nuxt.com/), based on the [Vue 3](https://vuejs.org/) framework. It contains multiple projects under the [Nx](https://nx.dev/) monorepo structure.

# Projects

## Cinemate

A movie database application that allows users to search for movies, view movie details.

### Development

Please use PNPM as the package manager for this project.

```bash
npm install -g pnpm
```

To install the dependencies, use the following command:

```bash
pnpm install
```

To run the project, use the following command:

```bash
pnpm run dev:cinemate
```

### Deployment

```bash
pnpm run build-cinemate
```

## Shopiverse

To add a database, please use the following commands:

```bash
nx run shopiverse:prisma-generate
```

```bash
nx run shopiverse:prisma-migrate
```

The `migrations` directory will be created and database tables will be created.

After data insertion, run the following command to look into the database:

```bash
nx run shopiverse:prisma-studio
```

The Prisma Studio will be opened in the browser with `http://localhost:5555`.
