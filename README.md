## GRUD-APP (Front-End)

A full-featured web application built with **NestJS** and **NestJS**, supporting multi-language (English/Ukrainian) interface. The app allows users to register, create and manage profiles, receive notifications, and interact with different roles (regular users and admins).

## Features

- **User Authentication** – Register, log in, and manage your account securely.
- **Profile Management** – Create, edit, and delete user profiles.
- **Roles & Permissions** – Regular users and admins with role-based access.
- **Admin Controls** – Admins can manage other users and their profiles.
- **Notifications** – Real-time notifications for updates and actions.
- **Multi-language Support** – English and Ukrainian interface.

## Technologies

- **Frontend:** NextJS, TypeScript, Material-UI Storybook i18n ESLint Stylelin Husky Jest
- **Backend:** Node.js, NestJS, MongoDB
- **Authentication:** JWT Access & Refresh tokens
- **Real-time Updates:** WebSockets

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Run with Docker

```bash

# build Docker image
docker build -t next-app .

# start container
docker docker run -d --name next-container -p 3000:3000 next-app

# stop container
docker docker stop next-container
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
