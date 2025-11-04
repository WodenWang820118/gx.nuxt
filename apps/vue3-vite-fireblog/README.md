# Fireblog

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Development](#development)
- [Architecture](#architecture)

## Overview

It's a simple blog application that allows users to create, read, update, and delete blog posts. The application is built using Vue 3, Vite, and Firebase. The Firebase SDKs include Firebase Authentication, Firestore, and Firebase Storage. Finally, it uses Firebase hosting to deploy the application.

## Usage

1. `.env.local` file is required to publish a blog(i.e., checking whether you're the admin or not). Add the following environment variables:

```
VITE_APP_ADMINEMAIL=<your_email>
```

2. Create a Firebase project and enable Firestore, Firebase Authentication, and Firebase Storage. Change the setup in the `shared/firebase/firebase-config.ts` file. It includes the document collection name and the storage bucket name.

3. Remove the GTM configuration in the `index.html` file, or change it to your GTM configuration.

## Development

- `npm install` to install dependencies
- `npm run dev` to start the development server
- `npm run build` to build the application
- Please check out the files in `.github/workflows` to see how to deploy the application to Firebase hosting with GitHub actions

## Architecture

- Apology that I prefer to use the kebab-case for the file naming convention rather than the PascalCase.
- The `app.vue` file is the main entry point of the application with the `router-view` only. Depending on the route, the corresponding component will be rendered.
- The `routes.ts` file contains the routes of the application. All routes are lazy-loaded.
