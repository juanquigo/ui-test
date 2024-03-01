## Node version
Make sure you're using the node version in the `.nvmrc` file
```sh
v18.12.1
```

## Project Setup
```sh
yarn install
```

## Enviroment Variables
You should set the required variables in the `.env` file for the project to work. You'll find a `.env.example` file, rename it and set the value provided
```sh
VITE_BACKEND_URL="askForMe"
```

## Compile and Hot-Reload for Development

```sh
yarn dev
```

## Compile and Minify for Production

```sh
yarn build
```

## Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```
