import { CustomError } from "../../../error/custom_error";
import { GenericError } from "../../../error/generic_error";
import { User, UpdateUser, CreateUser } from "../models/user_model";
import { UserRepositories } from "./user_repositories";
import { UserDataSource } from "../../data/interfaces/user_data_source";
import { BaseRepository } from "../../../../core/package/base_repository";
// import { CustomErrorHandler } from '../../../error/error_handler'

export class UserRepositoriesImplementation
  extends BaseRepository
  implements UserRepositories
{
  private usersDataSource: UserDataSource;
  private constructor(dataSource: UserDataSource) {
    super();
    this.usersDataSource = dataSource;
  }

  static instance: UserRepositories | null = null;

  static create(dataSource: UserDataSource) {
    if (UserRepositoriesImplementation.instance == null) {
      UserRepositoriesImplementation.instance =
        new UserRepositoriesImplementation(dataSource);
    }
    return UserRepositoriesImplementation.instance;
  }

  async getUser(id?: string): Promise<User> {
    return await this.callDataSource(async () => {
      return await this.usersDataSource.getUser(id!);
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.callDataSource(async () => {
      return await this.usersDataSource.getAllUsers();
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.callDataSource(async () => {
      return await this.usersDataSource.getUserByEmail(email);
    });
  }

  async createUser(data: CreateUser): Promise<User> {
    return await this.callDataSource(() =>
      this.usersDataSource.createUser(data)
    );
  }

  async updateUser(userId: string, data: UpdateUser): Promise<User> {
    return await this.callDataSource(async () => {
      const selectedUser = await this.usersDataSource.getUser(userId);
      delete selectedUser.techs;
      const updatedUser = {
        ...selectedUser,
        ...data,
      };
      return await this.usersDataSource.updateUser(updatedUser);
    });
  }

  async getUserWithTech(id: string): Promise<User> {
    return await this.callDataSource(async () => {
      return await this.usersDataSource.getUserWithTech(id);
    });
  }

  async createUserTech(userId: string, techId: string): Promise<User> {
    return await this.callDataSource(async () => {
      return await this.usersDataSource.createUserTech(userId, techId);
    });
  }
}
