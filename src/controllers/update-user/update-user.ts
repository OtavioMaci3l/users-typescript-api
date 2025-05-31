import { User } from "../../models/user";
import { CreatUserParams } from "../creat-user/protocols";
import { badRequest, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if(!body){
        return badRequest("Missing user id");
      }

      if (!id) {
        return badRequest("Missing user id");
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
        return badRequest("Some recived field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);

    } catch (error) {
      console.error("Unknown error in UpdateUserController:", error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
