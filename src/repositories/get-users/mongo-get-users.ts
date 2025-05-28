import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepositories implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string",
      },
    ];
  }
}
