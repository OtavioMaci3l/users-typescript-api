import { HttpResponse, HttpStatusCode } from "./protocols";

export const ok = <T>(body: T): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: body,
});

export const created = <T>(body: T): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body: body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return { statusCode: HttpStatusCode.BAD_REQUEST, body: message };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};
