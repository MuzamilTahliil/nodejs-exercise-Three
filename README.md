# Personal Finance Tracker API

A robust RESTful API for tracking personal finances, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, Login, Profile management (JWT + bcrypt).
- **Transactions**: Add income, expenses, and revenue. View monthly summaries.
- **File Upload**: Upload profile pictures to Cloudinary.
- **Documentation**: Integrated Swagger UI.



## Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/MuzamilTahliil/nodejs-exercise-Three.git
    cd nodejs-exercise-Three
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory and add:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  Run the server:
    ```bash
    npm run dev
    ```

## API Documentation

Visit `http://localhost:5000/docs` to view the comprehensive Swagger documentation.

