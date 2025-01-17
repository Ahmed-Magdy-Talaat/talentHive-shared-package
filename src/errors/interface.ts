export interface IError {
  statusCode: number;
  status: string;
  commingFrom: string;
  message: string;
}
export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}

