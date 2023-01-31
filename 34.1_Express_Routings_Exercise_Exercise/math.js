const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const ExpressError = require('./errorHandler')
const { toNumValidateNum, mean, mode, median } = require('./helpers')


/* ************Routes************* */

/* Route for mean of nums in query string */

app.get('/mean', (request, response, next) => {
    if (!request.query.nums) {
        return response.send("Input cannot be empty.  Input numbers only.")
    }

    try {
        let string = request.query.nums.split(',');
        let numArr = toNumValidateNum(string);
        let avg = mean(numArr);

        let result = {
            operation: 'Mean',
            Value: avg
        }

        return response.json(result);

    } catch (error) {
        const x = new ExpressError("Bad request.", 400);
        return next(x);
    }
});


/* Route for mean of nums in query string */

app.get('/median', (request, response, next) => {
    if (!request.query.nums) {
        return response.send("Input cannot be empty.  Input numbers only.")
    }

    try {
        let string = request.query.nums.split(',');
        let numArr = toNumValidateNum(string);
        let mid = median(numArr)

        let result = {
            operation: 'Median',
            Value: mid
        }
        return response.json(result);
    } catch (error) {
        const x = new ExpressError("Bad request.", 400);
        return next(x);
    }

    // return response.send("Median Page")
});


/* Route for mode of nums in query string */

app.get('/mode', (request, response, next) => {
    if (!request.query.nums) {
        return response.send("Input cannot be empty.  Input numbers only.")
    }
    try {
        let string = request.query.nums.split(',');
        let numArr = toNumValidateNum(string);
        let f = mode(numArr)

        let result = {
            operation: 'Mode',
            Value: f
        }
        return response.json(result);
    } catch (error) {
        const x = new ExpressError("Bad request.", 400);
        return next(x);
    }
});

app.get('/all', (request, response, next) => {
    if (!request.query.nums) {
        return response.send("Input cannot be empty.  Input numbers only.")
    }

    try {
        let string = request.query.nums.split(',');
        let numArr = toNumValidateNum(string);
        let avg = mean(numArr);
        let mid = median(numArr)
        let f = mode(numArr)

        return response.send(`Median: ${avg}, Mean: ${mid}, Mode: ${f}`)
    } catch (error) {
        const x = new ExpressError("Bad request.", 400);
        return next(x);
    }
});


/* ************Error Handlers************* */

/* Handle 404 Errors */
app.use(function (req, res, next) {
    const error404 = new ExpressError("Page Not Found", 404);
    return next(error404)
});


/* Handle Route Errors */
app.use((error, request, response, next) => {
    let status = error.status || 500;
    let message = error.message;

    return response.status(status).json({
        error: { message, status }
    });
});


/* Start Server */
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


