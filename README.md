# Card Management System - Node.js Project

## Student details

Full Name:Tomer Karavani
Phone: 0546781099
Email: tomeriko89@gmail.com

## Project Description

A Node.js-based card management system that enables card organization and management with user authentication and advanced security features.

## Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - User authentication
- **Bcrypt** - Password encryption
- **Joi** - Data validation
- **Winston** - Logging management
- **Cors** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

## System Requirements

- Node.js (version 14 or higher)
- MongoDB
- npm

## Installation and Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**
   Create a `.env` file with the following parameters:

```env
MONGODB_URI=<database connection string>
PORT=<server port>
TOKEN_SECRET=<token encryption key>
```

3. **Start the server:**

Development mode (with nodemon):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Project Structure

```
src/
├── config/         # Configuration
├── controller/     # Controllers
├── middleware/     # Middleware functions
├── models/         # MongoDB models
├── router/         # Route definitions
├── services/       # Business logic
├── utils/          # Helper functions
├── validation/     # Validation
└── server.js       # Application entry point
```

## Key Features

- Card management
- User authentication
- Role-based permissions
- Data validation
- Detailed logging
- Advanced security

## Available Scripts

- `npm start` - Run server in production mode
- `npm run dev` - Run server in development mode with nodemon
- `npm run build` - Install dependencies and verify code integrity

## Security

- Password encryption with bcrypt
- JWT authentication
- Input validation
- Protection against common attacks

## Logging

Logs are stored in the `logs/` directory and include:

- Error logs
- HTTP request logs
- System operation logs

## License

ISC
