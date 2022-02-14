# Cmandr

A web application dedicated to managing and organising all of your command snippets.
Also includes a bookmark manager for storing links related to development work.

## Technologies Used

- Frontend: React (create-react-app) with Chakra UI
- Backend: ASP.NET Core 6.0 Web API
- Database: Azure SQL server

#### Frontend Folder Structure

├── components
├── |── auth
├── |── commands
├── |── links
├── data          ( contains all api call functions )
├── layout        ( layout specific components )
├── models        ( view models based on the web api DTOs )
├── redux         ( contains all redux reducers )
├── theme         ( general theme settings for chakra ui )
├── views

## Local Development Setup ( Frontend )

In the project directory, run
### `yarn`

Then to run the development server run 
### `yarn start`