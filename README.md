# Cmandr

A web application dedicated to managing and organising command snippets.
Also includes a bookmark manager for storing links related to development work.

## Technologies Used

- Frontend: React (create-react-app) with [Chakra UI](https://chakra-ui.com/)⚡️
- Backend: ASP.NET Core 6.0 Web API
- Database: Azure SQL server

## Frontend Folder Structure

📦src  
 ┣ 📂api - _contains axios instance and all of the api endpoints_  
 ┣ 📂auth - _contains Azure Active Directory B2C policies and msal config_  
 ┣ 📂components  
 ┃ ┣ 📂auth  
 ┃ ┣ 📂commands  
 ┃ ┣ 📂layout  
 ┃ ┣ 📂links  
 ┃ ┗ 📂other  
 ┣ 📂helpers - _helper functions_  
 ┣ 📂hooks - _custom react hooks, mainly for react query logic_  
 ┣ 📂models - _view models based on the web api DTOs (data transfer objects)_  
 ┣ 📂redux - _contains redux store and all slices_  
 ┣ 📂test - _contains test data and test utils (component tests are colocated)_  
 ┣ 📂theme - _theme configuration for chakra ui_  
 ┣ 📂views - _individual components for each page of the site_

## Local Development Setup ( Frontend )

Make sure [Node.js](https://nodejs.org/en/) (**16.4.0**) and [Yarn](https://yarnpkg.com/) are installed.

Then in the project directory, run

```sh
$ yarn
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
