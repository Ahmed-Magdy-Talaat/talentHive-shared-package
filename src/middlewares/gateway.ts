import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/classes';
import * as JWT from 'jsonwebtoken';

interface IPayload {
  id: string;
  iat: number;
}

// List of allowed services
const services = [
  'auth',
  'chat',
  'order',
  'seller',
  'buyer',
  'gig',
  'search',
  'review',
];

// Middleware to verify API gateway token
export const verifyApiGateway = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for gatewayToken in headers
  const token = req.headers.gatewayToken as string;
  if (!token) {
    throw new NotAuthorizedError(
      'Invalid Request',
      'Request not coming from API gateway: Missing gatewayToken in headers'
    );
  }

  try {
    // Verify token using a secret key stored in environment variables
    const payload = JWT.verify(
      token,
      process.env.GATEWAY_SECRET_KEY || ''
    ) as IPayload;

    if (!services.includes(payload.id)) {
      throw new NotAuthorizedError(
        'Unauthorized Service',
        `Service ID "${payload.id}" is not authorized to access this resource`
      );
    }

    next();
  } catch (err: any) {
    if (err instanceof JWT.JsonWebTokenError) {
      throw new NotAuthorizedError(
        'Invalid Token',
        'Failed to verify token in verifyApiGateway()'
      );
    } else {
      // General error handling for other unexpected errors
      throw new Error(`Unexpected error in verifyApiGateway(): ${err.message}`);
    }
  }
};
