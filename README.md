# Hannah Nails - Salon Management System

A comprehensive management system for nail salons built with Vue 3, TypeScript, and Electron.

## Overview

Hannah Nails is a desktop application designed to streamline the management of nail salon operations with an intuitive and modern interface. Built with NaiveUI, Vue 3, and Electron, this application offers a complete solution for salon owners.

## Features

- **Service Management**: Create, update, and manage your salon's service offerings
- **Appointment Scheduling**: Manage customer appointments and staff scheduling
- **Customer Management**: Maintain customer records and history
- **Staff Management**: Track staff performance and schedules
- **Reporting & Analytics**: Generate reports on sales, services, and customer trends
- **Dark/Light Theme**: Customizable UI with theme switching

## Technology Stack

- Vue 3 + TypeScript
- Vite for fast builds
- Electron for cross-platform desktop application
- Naive UI component library
- Pinia for state management
- Vue Router for navigation
- Alova for API requests

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/tuongtv87/hannah-nails.git
   cd hannah-nails
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run in development mode:
   ```
   # Web development mode
   npm run dev
   # or
   yarn dev

   # Electron development mode
   npm run electron:dev
   # or
   yarn electron:dev
   ```

### Building for Production

```
# Build for web
npm run build
# or
yarn build

# Build Electron application
npm run electron:build
# or
yarn electron:build
```

The Electron builds will be available in the `release` directory.

## Project Structure

- `src/components` - Reusable UI components
- `src/layouts` - Layout components (Header, Menu, Content)
- `src/views` - Page components
- `src/router` - Navigation configuration
- `src/store` - Pinia state management
- `src/utils` - Utility functions
- `src/service` - API services and endpoints

## License

MIT

## Contact

Hannah Nails Team - [GitHub](https://github.com/tuongtv87/hannah-nails)
