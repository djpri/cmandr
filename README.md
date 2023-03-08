# Cmandr

A web application dedicated to managing and organising command snippets.
Also includes a bookmark manager for storing links related to development work.

## Technologies Used

- Frontend: React
- Backend: ASP.NET Core 7.0
- Database: MySQL

## Features

- Drag and drop categories into groups
- Search, sort and pagination of items
- Bulk delete items

## Frontend Directory

```
📦src
 ┣ 📂api         - contains axios instance and all of the api endpoints
 ┣ 📂auth        - contains Azure Active Directory B2C policies and msal config
 ┣ 📂components
 ┃ ┣ 📁auth
 ┃ ┣ 📁commands
 ┃ ┣ 📁layout
 ┃ ┣ 📁links
 ┃ ┗ 📁other
 ┣ 📂helpers     - helper functions
 ┣ 📂hooks       - custom react hooks, mainly for react query logic
 ┣ 📂models      - view models based on the web api DTOs (data transfer objects)
 ┣ 📂redux       - contains redux store and all slices
 ┣ 📂test        - contains test data and test utils (component tests are colocated)
 ┣ 📂theme       - theme configuration for chakra ui
 ┣ 📂views       - individual components for each page of the site

```

## Local Development Setup ( Frontend )

Make sure [Node.js](https://nodejs.org/en/) (**16.4.0**) and [Yarn](https://yarnpkg.com/) are installed.

Then in the project directory, run

```sh
$ yarn
```

## Environment Variables

Add to .env.local file for use in development.

**REACT_APP_BASE_URL** - The base URL for the backend api
**REACT_APP_CLIENT_ID** - The client id for Azure B2C

#### Example

```
REACT_APP_BASE_URL="https://localhost:44310/api/"
REACT_APP_CLIENT_ID=aaaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
```

## Scripts

### Run development server

Open http://localhost:3000/ to view the app if page doesn't load automatically

```sh
$ yarn start
```

### Create build folder for production

```sh
$ yarn build
```

### Serve build

```sh
$ yarn serve
```

### Run tests using Jest

```sh
$ yarn test
```
