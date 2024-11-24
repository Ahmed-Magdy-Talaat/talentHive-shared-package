import { StatusCodes } from 'http-status-codes';
import { IError } from './interface';

abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  commingFrom: string;

  /**
   * This constructor is used to create an instance of the CustomError class.
   * It accepts two parameters: the error message and the source of the error.
   * The error message is passed to the parent class (Error) and the source of the error is stored in the commingFrom property.
   * @param {string} message - The error message.
   * @param {string} commingFrom - The source of the error.
   */
  constructor(message: string, commingFrom: string) {
    super(message);
    this.commingFrom = commingFrom;
  }
  /**
   * This method is used to serialize the error object into a plain object.
   * This is necessary because the Error object is not serializable by default.
   * @returns {IError} A plain object with the error details.
   */

  serializeErrors(): IError {
    return {
      statusCode: this.statusCode,
      message: this.message,
      status: this.status,
      commingFrom: this.commingFrom,
    };
  }
}

export class BadRequest extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = 'error';

  constructor(message: string, commingFrom: string) {
    super(message, commingFrom);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}
