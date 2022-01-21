import express from 'express';
import cors from 'cors';
import routes from './routes';
import startScheduler from './scheduler';

// Set up the express app
const app = express();

// Enable cors
app.use(cors({ origin: true }));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Application Routes
app.use('/api/v1', routes);

// Start recurring jobs
startScheduler();

export default app;
