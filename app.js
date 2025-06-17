require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://cdn.tailwindcss.com', 'https://cdnjs.cloudflare.com'],
                scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://cdn.tailwindcss.com'],
                'script-src-attr': ["'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                fontSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],
            },
        },
    })
);

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Terlalu banyak request dari IP ini, silakan coba lagi nanti.',
});
app.use(limiter);

// CORS
app.use(cors());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

// Routes
const indexRoutes = require('./app/routes/index');
const authRoutes = require('./app/routes/auth');
const adminRoutes = require('./app/routes/admin');
const alumniRoutes = require('./app/routes/alumni');
const apiRoutes = require('./app/routes/api');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/alumni', alumniRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
// 404 Handler - halaman tidak ditemukan
app.use((req, res, next) => {
    const error = new Error(`Halaman ${req.originalUrl} tidak ditemukan`);
    error.status = 404;
    next(error);
});

// Error Handler
app.use((err, req, res, next) => {
    // Set default error values
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Terjadi Kesalahan Internal Server';

    // Log error untuk debugging (optional)
    if (status === 500) {
        console.error('Server Error:', err);
    }

    // Set status code
    res.status(status);

    // Render error page dengan data yang diperlukan
    res.render('error', {
        title: `Error ${status}`,
        status: status,
        message: message,
        error: process.env.NODE_ENV !== 'production' ? err : {},
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
    });
});
module.exports = app;
