import { IGetUsersController, IGetUsersRepository } from "./protocols"; // Importar HttpResponse

export class GetUsersController implements IGetUsersController {
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
