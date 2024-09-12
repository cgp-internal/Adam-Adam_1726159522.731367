#!/bin/bash

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs

# Initialize a new Node.js project
npm init -y

# Install Express.js
npm install express

# Install TypeScript
npm install -D typescript

# Initialize a new TypeScript project
npx tsc --init

# Create a new directory for the frontend
mkdir frontend

# Create a new directory for the backend
mkdir backend

# Change into the frontend directory
cd frontend

# Initialize a new React.js project
npx create-react-app . --template typescript

# Change into the backend directory
cd ../backend

# Initialize a new Node.js project
npm init -y

# Install Express.js
npm install express

# Install TypeScript
npm install -D typescript

# Initialize a new TypeScript project
npx tsc --init