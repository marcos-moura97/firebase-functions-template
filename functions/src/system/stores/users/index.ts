import { dict, User, UserItens, UserResponse } from "../../models";
import { storeDB } from "../../resolver";
import { FiltrateUserItens } from "../filters";

export class UserCrud {
  filter: FiltrateUserItens;

  constructor() {
    this.filter = new FiltrateUserItens();
  }

  async CreateUser(uid: string, data: User): Promise<string> {
    // Check
    data.creationTime = Date.now();

    let userId = await storeDB.pushUser(uid, data);

    return userId;
  }

  async SearchUsers(
    userId: string,
    searchParams: dict<string[]>
  ): Promise<UserResponse[]> {
    let userItenss = await storeDB.getUserItens();
    userItenss = await this.filter.FiltrateUserItens(userItenss, searchParams);
    const usersResponse = await this.toUsersResponse(userId, userItenss);
    return usersResponse;
  }

  async toUsersResponse(
    userId: string,
    users: dict<UserItens>
  ): Promise<UserResponse[]> {
    const usersResponse: UserResponse[] = [];

    for (const key in users) {
      const user = users[key];
      if (user !== undefined) {
        usersResponse.push(await this.toUserResponse(key, user));
      }
    }

    return usersResponse;
  }

  async GetUser(userId: string): Promise<User> {
    const user = await storeDB.getUser(userId);

    if (user == null) throw new Error("User not found");

    return this.toUserResponse(userId, user);
  }

  async toUserResponse(userId: string, user: User): Promise<UserResponse> {
    return {
      id: userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      creationTime: user.creationTime,
    };
  }

  async UpdateUser(uid: string, data: User): Promise<boolean> {
    // Check

    let user = await storeDB.getUser(uid);

    if (user) {
      if (data?.name) user.name = data.name;

      if (data?.address) user.address = data.address;

      if (data?.email) user.email = data.email;

      if (data?.phone) user.phone = data.phone;

      await storeDB.setUser(uid, user);

      return true;
    } else {
      return false;
    }
  }

  async DeleteUser(userId: string): Promise<void> {
    storeDB.setUser(userId, null);
  }
}
