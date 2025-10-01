
SuperManager - Frontend part (Under Development) - v1.0.0

## Overview

![Super Manager Logo](docs/images/sm_logo.png)

SuperManager is an IT management system designed to streamline and optimize your organization's technology operations.

**Super Manager - Frontend** is the web interface for managing IT infrastructure, built with modern technologies for a fast and responsive user experience. It connects seamlessly to the backend API to provide tools for device inventory, software deployment, reporting, supply stock control, calendar management, user administration, and notifications.

## Features

- **Device Inventory**: Track and manage all IT assets and devices.
- **Software & Script Deployment**: Remotely deploy software and execute scripts across managed devices.
- **Reporting**: Generate detailed reports on device status, software deployments, and inventory.
- **Stock Control**: Monitor and manage consumable supplies and inventory levels.
- **Calendar System**: Organize and schedule IT-related events, maintenance, and tasks.
- **User Management**: Control access, roles, and permissions for system users.
- **Notifications**: Receive alerts and updates for important events and system activities.

## Technologies Used

- **React 19**: Modern UI library for building interactive interfaces.
- **React Router v7**: Advanced routing for single-page applications.
- **TypeScript**: Strongly typed language for scalable and maintainable code.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: HTTP client for connecting to the backend API.


## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/gsmx64/supermanager-frontend.git
    ```
2. Install the dependencies:
    ```bash
    npm install
3. Configure environment variables as needed. Copy `.env.development.sample` to `.env.development` and edit it with your API endpoint and other settings. There is also a testing sample file. For the production environment, copy one of those and inject it into your environment.
4. Check that `VITE_API_URL` is pointing to your API URL, or use it as is if you are running locally (the backend runs on http://localhost:8000 and Vite will route `/api` from this frontend to that).
5. Change `VITE_STORAGE_URL` to your backend URL or your desired storage for static content.
6. Start the development server:
    ```bash
    npm run dev
    ```

## Backend Integration

The frontend communicates with the [Super Manager Backend](https://github.com/gsmx64/supermanager-backend.git), which is built using **Django Rest Framework 5**. The backend provides a robust API for all IT management features.

## Documentation

For detailed usage examples and API integration, see the [docs](./docs) folder.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.

