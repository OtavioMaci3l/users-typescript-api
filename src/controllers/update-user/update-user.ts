import { User } from "../../models/user";
import { CreatUserParams } from "../creat-user/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const allowedFieldToUpdate: (keyof CreatUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldToUpdate.includes(key as keyof UpdateUserParams)
      );
      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some recived field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return{
        statusCode: 200,
        body: user
      }

    } catch (error) {
      console.error("Unknown error in UpdateUserController:", error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
