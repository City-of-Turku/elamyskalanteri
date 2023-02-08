#!/bin/bash

# Define the target file path
target_file="./build/static/js/main.js"

# Use regex to find the source file with a changing hashed filename
src_file=$(find ./build/static/js/ -regex ".*/main\.[a-zA-Z0-9]+\.js" -print -quit)

# Check if the source file was found
if [ -n "$src_file" ]; then
  # Remove the existing target file if it exists
  if [ -f "$target_file" ]; then
    rm "$target_file"
  fi

  # Create a copy of the source file
  cp "$src_file" "$target_file"

  # Confirm the creation of the copy
  echo "Copy created: $target_file <- $src_file"
else
  # Confirm that the source file was not found
  echo "Error: source file not found"
fi