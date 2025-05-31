import validator from "validator";

import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreatUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRespository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreatUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      //vertificar campos obrigatorios
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
        return {
          statusCode: 400,
          body: `Fields { ${missingFields}} is required`,
        };
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: `E-mail is invalid`,
        };
      }

      const user = await this.createUserRespository.creatUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      console.error("Error in CreatUserController:", error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
