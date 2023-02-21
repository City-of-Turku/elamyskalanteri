# Elämyskalenteri

Event calendar implementation for Varsinais-Suomi

## Introduction

This React based app is designed to work on any web page as an embedded plugin. There's a bunch of data-attributes that we can use to configure the initial settings for the app. This includes settings for the overall app appearance and also query parameters for the event data fetching.

There needs to be two deployed instances of the app. One for the list view and other for showing single event's details. By default when running the `npm run build` (or `npm start` for dev) command, it will build the list view. The distinctive setting between these two is the `data-is-detail-view=""` attribute. For the listing view, this should be set to `false` and for the detail page it needs to be set to `true`.

## Requirements

Node v16 or newer

## Running local dev environment

### Getting started

Install required NPM packages for both React UI and Embed examples

`cd react-ui && npm install && cd ..`

`cd embed-examples && npm install && cd ..`

### Start React UI

`npm run start-react`

### Start local server for testing embedded listings

`npm run start-embed`

**Note:**

- Dev server for react must be running before embed examples can be seen
- To be able to see event detail pages, the embed-examples server must be running

## Setting up for production

### React UI ENV settings

Make a copy of the `react-ui/.env` to `react-ui/.env.local`. Make sure the `.env.local` variables are set correctly:

- `PORT`: the port where the app is served on.
- `REACT_APP_EMBED_BASE_URL`: URL of your domain where the app will be served on.
- `REACT_APP_EMBED_ENTRY_FILE`: Name of the js file that handles getting correct js and css files for embedding.
- `REACT_APP_LINKEDEVENTS_BASE_URL`: URL of the Linkedevents backend API.
- `REACT_APP_EVENT_DETAIL_BASE_URL` Base URL of your domain for a page with single event's details. Trailing slash is required.

### Running React UI with Docker

`docker compose up`

### Running React UI manually

1. In the `react-ui/embedEntry.js` file, set correct `baseUrl` variable which should match with your `react-ui/.env.local` file's `REACT_APP_EMBED_BASE_URL` value.
2. Create production build:
   `cd react-ui && npm run build`
3. Use something like [serve](https://www.npmjs.com/package/serve) to serve the app.
