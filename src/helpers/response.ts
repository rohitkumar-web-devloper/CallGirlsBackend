import { Request, Response, NextFunction } from 'express';
interface SuccessResponse<T> {
    data: T;
    type: 'success';
    message: string;
}

interface ErrorResponse {
    data: any | null;          
    errors: string[];
    message: string;
    type: 'error';
}

// Function to create a success response
function success<T>(message: string, data: T): SuccessResponse<T> {
    return {
        data,
        type: 'success',
        message,
    };
}

// Function to create an error response
function error(message: string, errors: string[] = [], data: any | null = null): ErrorResponse {
    return {
        data,
        errors,
        message,
        type: 'error',
    };
}

// Type for the request handler function
type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Wrap request handler to catch errors
const wrapRequestHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

// Export the functions
export { success, error, wrapRequestHandler };
