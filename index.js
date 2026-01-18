require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
});
app.use(limiter);

// Swagger Config
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Personal Finance Tracker API',
            version: '1.0.0',
            description: 'API for tracking income, expenses, and more',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local server',
            },
            {
                url: 'https://your-render-url.onrender.com',
                description: 'Production server',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], // Updated path to routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', (req, res) => {
    res.send('Personal Finance Tracker API is running');
});

app.use('/auth', require('./routes/authRoutes'));
app.use('/transactions', require('./routes/transactionRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/upload', require('./routes/uploadRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/docs`);
});
