const response = (
  statusCode: number,
  message: string,
  payload: object | null,
  error: any,
  token: string | null,
) => ({ statusCode, message, payload, error, token });

export default response;
