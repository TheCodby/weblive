export class ApiError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number, public data: any = null) {
    super(message, data);
    this.statusCode = statusCode;
  }
}
