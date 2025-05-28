import express, { } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepositories } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";


const main = async () => {
  config();

  const app = express();
  
  const port = process.env.PORT || 8000;
  
  await MongoClient.connect()
  
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepositories = new MongoGetUsersRepositories();
    const getUsersController = new GetUsersController(mongoGetUsersRepositories);
    
    const { body, statusCode } = await getUsersController.handle();
    
    res.send(body).status(statusCode);
  });

  app.listen(port, () => console.log(`listening on port ${port}!`));
}

main();