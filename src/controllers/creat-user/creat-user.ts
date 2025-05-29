import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreatUserParams,
  ICreateUserRepository,
  ICreatUserController,
} from "./protocols";

export class CreateUserController implements ICreatUserController {
  constructor(private readonly createUserRespository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreatUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      // validar se body existe

      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      const user = await this.createUserRespository.creatUser(httpRequest.body);

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
