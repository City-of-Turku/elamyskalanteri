# elamyskalenteri
Event calendar implementation for Varsinais-Suomi

## Requirements

Node v16 or newer

## Getting started
Install required NPM packages for both React UI and Embed examples

```cd react-ui && npm install && cd ..```

```cd embed-examples && npm install && cd ..```

## Running local test environment
### Start React UI
```npm run start-react```

### Start local server for testing embedded listings
```npm run start-embed```

(Dev server for react must be running)


## Setting up for production

### React UI ENV settings
Make a copy of the `react-ui/.env` to `react-ui/.env.local`. Make sure the `.env.local` variables are set correctly:
- `PORT`: the port where the app is served on.
- `REACT_APP_EMBED_BASE_URL`: URL of your domain where the app will be served on.
- `REACT_APP_EMBED_ENTRY_FILE`: Name of the js file that handles getting correct js and css files for embedding.
- `REACT_APP_LINKEDEVENTS_BASE_URL`: URL of the Linkedevents backend API.

### Running React UI with Docker
```docker compose up```

### Running React UI manually
1. In the `react-ui/embedEntry.js` file, set correct `baseUrl` variable which should match with your `react-ui/.env.local` file's `REACT_APP_EMBED_BASE_URL` value.
2. Create production build:
```cd react-ui && npm run build```
3. Use something like [serve](https://www.npmjs.com/package/serve) to serve the app.