interface errorResponse {
  msg: string;
  statusCode: number;
  // new (message: string, statusCode: string): {
  //   msg: string;
  //   statusCode: number;
  // };
}

class ErrorResponse extends Error implements errorResponse {
  msg: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    const status = 0;
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
