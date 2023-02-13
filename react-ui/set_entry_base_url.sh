#!/bin/bash

# Check if .env.local exists and source it if it does
if [ -f .env.local ]; then
  source .env.local
fi

# Fall back to .env if REACT_APP_EMBED_BASE_URL is not set in .env.local
if [ -z "${REACT_APP_EMBED_BASE_URL}" ]; then
  if [ -f .env ]; then
    source .env
  fi
fi

baseUrl=${REACT_APP_EMBED_BASE_URL}

# Exit if baseUrl is empty
if [ -z "${baseUrl}" ]; then
  echo "Error: REACT_APP_EMBED_BASE_URL is not defined in .env or .env.local"
  exit 1
fi

# Replace the value of the baseUrl constant in embedEntry
sed -i "s|const baseUrl = '.*'|const baseUrl = '$baseUrl'|" ./build/embedEntry.js