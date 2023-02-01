const express = require('express');
const app = express();

/* Library and Module Imports */
const ExpressError = require('./expressError');
const userRoutes = require('./routes/items');
const middleware = require('./middleware');




















/* Middleware */
app.use(express.json());
app.use('/items', userRoutes);
app.use(middleware.logger);


/* ************Error Handling************* */

/* Handle 404 Errors */
app.use(function (req, res, next) {
    const error404 = new ExpressError('Page Not Found', 404);
    return next(error404);
});

// 404 handler from another file in course - WHICH ONE?
// app.use(function(req, res) {
//     return new ExpressError("Not Found", 404);
//   });


/* Handle Route Errors */
app.use((error, request, response, next) => {
    let status = error.status || 500;
    let message = error.message;

    return response.status(status).json({
        error: { message, status }
    });
});

/* Start Server & Assign Port */
// app.listen(3000, () => {
//     console.log('Server running on port 3000.');
// });

module.exports = app;



