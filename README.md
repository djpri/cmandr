# Cmandr [![CI](https://github.com/djpri/cmandr/actions/workflows/tests-and-linting.yml/badge.svg)](https://github.com/djpri/cmandr/actions/workflows/tests-and-linting.yml)

A web application dedicated to managing and organising command snippets and code snippets.
Also includes a bookmark manager for storing links related to development work.

## Technologies Used

- Frontend: React 18
- Backend: ASP.NET Core 7.0
- Database: MySQL

## Features

- Drag and drop categories into groups
- Search, sort and pagination of items
- Bulk move items to new category
- Bulk delete items
- Import bookmarks from chrome or firefox

### Ideas for Future Features

- Save and manage full code snippets
- Save and preview CSS styles (e.g. [Css Box Shadow Examples](https://getcssscan.com/css-box-shadow-examples))
- Chrome extension for easily saving snippets or bookmarks

## Frontend Directory

```
📦src
 ┣ 📂api         - contains custom axios instance with methods for calling all of the api endpoints
 ┣ 📂auth        - contains Azure Active Directory B2C policies and msal config (https://www.npmjs.com/package/%40azure/msal-browser)
 ┣ 📂components
 ┣ 📂helpers     - helper functions
 ┣ 📂hooks       - custom react hooks, mainly for react query logic
 ┣ 📂models      - view models based on the web api DTOs (data transfer objects)
 ┣ 📂redux       - contains redux store and all slices
 ┣ 📂test        - contains test data and test utils (component tests are colocated)
 ┣ 📂theme       - theme configuration for chakra ui
 ┣ 📂views       - individual components for each page of the site

```

## Local Development Setup ( Frontend )

Make sure [Node.js](https://nodejs.org/en/) (**18.15.0**) and [Yarn](https://yarnpkg.com/) are installed.

Check node version using `node --version`

Then in the project directory, run

```sh
$ npm install
```

## Environment Variables

- See **.env.example** for a list of all variable names
- Use **.env** file for production environment
- Use **.env.local** file for use in development

## Scripts

### Run development server

First, run the backend server (see [cmandr-backend](https://github.com/djpri/cmandr-backend)) and make sure that VITE_BASE_URL in .env.local is set to the applicationUrl value in launchSettings.json.

Then run:

```sh
$ npm run start
```

Open http://localhost:3000/ to view the app if the page doesn't load automatically.

### Create build folder for production

```sh
$ npm run build
```

### Preview build

```sh
$ npm run serve
```

### Run tests using Vitest

```sh
$ npm run test
```

## Deployment

This application relies on client-side routing, so we redirect all requests to the index.html to be handled by react router.

**vercel.json**

```
{
  "rewrites":  [
    {"source": "/(.*)", "destination": "/"}
  ]
}
```
