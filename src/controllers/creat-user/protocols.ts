import { User } from "../../models/user";

export interface CreatUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    creatUser(params: CreatUserParams): Promise<User>;
}