import validator from "validator";

import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreatUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRespository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreatUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      let missingFields: string = "";
      let missing: boolean = false;

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreatUserParams]?.length) {
          missing = true;
          missingFields += field + ", ";
        }
      }

      if (missing) {
        return badRequest(`Fields { ${missingFields}} is required`);
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return badRequest(`E-mail is invalid`);
      }

      const user = await this.createUserRespository.creatUser(
        httpRequest.body!
      );

      return created<User>(user);

    } catch (error) {
      console.error("Error in CreatUserController:", error);
      return serverError();
    }
  }
}
