import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() { // Adicionar tipo de retorno explícito
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };

    } catch (error) {
      
      console.error("Error fetching users:", error);

      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
 