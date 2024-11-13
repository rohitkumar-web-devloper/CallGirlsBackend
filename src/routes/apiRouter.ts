import express, { Router } from 'express';
import app from '../app';

// Create the main API router
const apiRouter: Router = Router();
app.use('/api', apiRouter);

// Create sub-routers for different routes
const createRouter: Router = Router();
apiRouter.use('/create', createRouter);

const deleteRouter: Router = Router();
apiRouter.use('/delete', deleteRouter);

const retrieveRouter: Router = Router();
apiRouter.use('/retrieve', retrieveRouter);

const updateRouter: Router = Router();
apiRouter.use('/update', updateRouter);

// Export the routers
export {
    apiRouter,
    createRouter,
    deleteRouter,
    retrieveRouter,
    updateRouter,
};
