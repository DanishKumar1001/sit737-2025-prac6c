const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// Winston logger config

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Middleware to log all incoming requests

app.use((req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.url} from IP ${req.ip}`);
    next();
});

// Middleware to validate and parse input

function validateInput(req, res, next) {
    const { num1, num2 } = req.query;

    if (num1 === undefined || num2 === undefined) {
        logger.error('Missing query parameters', { num1, num2 });
        return res.status(400).json({ error: 'Both num1 and num2 parameters are required' });
    }

    req.num1 = parseFloat(num1);
    req.num2 = parseFloat(num2);

    if (isNaN(req.num1) || isNaN(req.num2)) {
        logger.error('Invalid number format', { num1, num2 });
        return res.status(400).json({ error: 'Both num1 and num2 must be valid numbers' });
    }

    next();
}
// url - http://localhost:port/routename?num1=value&num2=value

// Routes

//Addition

app.get('/add', validateInput, (req, res) => {
    const result = req.num1 + req.num2;
    logger.info(`Addition: ${req.num1} + ${req.num2} = ${result}`);
    res.json({ result });
});

//Subtraction

app.get('/subtract', validateInput, (req, res) => {
    if (req.num1 < req.num2) {
        logger.error(`Subtraction error: num1 (${req.num1}) is less than num2 (${req.num2})`);
        return res.status(400).json({ error: 'Subtraction would result in a negative number. num1 must be greater than or equal to num2.' });
    }

    const result = req.num1 - req.num2;
    logger.info(`Subtraction: ${req.num1} - ${req.num2} = ${result}`);
    res.json({ result });
});

//Multiplication

app.get('/multiply', validateInput, (req, res) => {
    const result = req.num1 * req.num2;
    logger.info(`Multiplication: ${req.num1} * ${req.num2} = ${result}`);
    res.json({ result });
});

//Division

app.get('/divide', validateInput, (req, res) => {
    if (req.num2 === 0) {
        logger.error('Attempted division by zero');
        return res.status(400).json({ error: 'Division by zero is not allowed' });
    }
    const result = req.num1 / req.num2;
    logger.info(`Division: ${req.num1} / ${req.num2} = ${result}`);
    res.json({ result });
});

// Exponentiation (Power)
app.get('/power', validateInput, (req, res) => {
    const result = Math.pow(req.num1, req.num2);
    logger.info(`Exponentiation: ${req.num1} ^ ${req.num2} = ${result}`);
    res.json({ result });
});

// Modulo
app.get('/modulo', validateInput, (req, res) => {
    if (req.num2 === 0) {
        logger.error('Attempted modulo by zero');
        return res.status(400).json({ error: 'Modulo by zero is not allowed' });
    }
    const result = req.num1 % req.num2;
    logger.info(`Modulo: ${req.num1} % ${req.num2} = ${result}`);
    res.json({ result });
});

// Square Root
app.get('/sqrt', (req, res) => {
    const { num1 } = req.query;
    const { num2 } = req.query;

    if (num1 === undefined) {
        logger.error('Missing num1 parameter for square root');
        return res.status(400).json({ error: 'num1 parameter is required' });
    }
    else if (num2 === undefined) {
        logger.error('Missing num2 parameter for square root');
        return res.status(400).json({ error: 'num2 parameter is required' });
    }
   

    const number = parseFloat(num1 && num2 );

    if (isNaN(number)) {
        logger.error('Invalid number format for square root', { num1 });
        return res.status(400).json({ error: 'num1 must be a valid number' });
    }

    if (number < 0) {
        logger.error('Attempted square root of negative number');
        return res.status(400).json({ error: 'Cannot calculate square root of a negative number' });
    }

    const result = Math.sqrt(number);
    logger.info(`Square Root: sqrt(${number}) = ${result}`);
    res.json({ result });
});

// Percentage Calculation
app.get('/percentage', validateInput, (req, res) => {
    if (req.num2 === 0) {
        logger.error('Attempted to divide by zero in percentage calculation');
        return res.status(400).json({ error: 'Denominator (num2) cannot be zero' });
    }

    const result = (req.num1 / req.num2) * 100;
    logger.info(`Percentage: (${req.num1} / ${req.num2}) * 100 = ${result}%`);
    res.json({ result: `${result}%` });
});

// 404 error handler
app.use((req, res) => {
    logger.warn(`Invalid endpoint accessed: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Invalid endpoint. Use /add, /subtract, /multiply, /divide, /power, /modulo, /sqrt or /percentage with num1 and num2 query parameters.' });
});

// Start server
app.listen(port, () => {
    logger.info(`Calculator microservice running on http://localhost:${port}`);
});

