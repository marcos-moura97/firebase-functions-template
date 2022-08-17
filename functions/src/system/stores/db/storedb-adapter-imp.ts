import { User, UserItens, Itens, Item } from "../../models";
import { dict } from "../../models/structs";
import { storeDbAdapter } from "./storedb-adapter";

class ImpStoreDbAdapter implements storeDbAdapter {
  db: dbAdapter;
  userEndpoint: string;
  itemEndpoint: string;

  constructor(dbAdapter: dbAdapter) {
    this.db = dbAdapter;

    this.itemEndpoint = "itens/";
    this.userEndpoint = "users/";
  }
  async getUser(id: string): Promise<User> {
    const ud = await this.db.userData(id);
    const dbud = await this.db.get(this.userEndpoint + id);

    return Object.assign(ud, dbud);
  }
  async pushUser(uid: string, user: User): Promise<string> {
    return await this.db.push(this.userEndpoint, user);
  }
  async setUser(key: string, user: User): Promise<void> {
    this.db.set(this.userEndpoint + key, user);
  }
  async getItens(userId: string): Promise<Itens> {
    return await this.db.get(this.itemEndpoint + userId);
  }
  async getItem(userId: string, itemId: string): Promise<Item> {
    return await this.db.get(this.itemEndpoint + userId + "/" + itemId);
  }
  async setItem(
    userId: string,
    itemId: string,
    item: Item | null
  ): Promise<void> {
    this.db.set(this.itemEndpoint + userId + "/" + itemId, item);
  }
  async pushItem(item: Item, userId: string): Promise<string> {
    return await this.db.push(this.itemEndpoint + userId, item);
  }

  async getUserItens(): Promise<dict<UserItens>> {
    const userItenss: dict<UserItens> = {};

    const users: dict<User> = await this.getUsers();
    const menus: dict<Itens> = await this.getItenss();

    for (const key in users) {
      if (menus.hasOwnProperty(key)) {
        const userItens: UserItens = Object.assign(users[key]);
        userItens.Itens = Object.assign(menus[key]);

        userItenss[key] = userItens;
      }
    }

    return userItenss;
  }

  // auxiliars
  async getUsers(): Promise<dict<User>> {
    return await this.db.get(this.userEndpoint);
  }

  async getItenss(): Promise<dict<Itens>> {
    return await this.db.get(this.itemEndpoint);
  }
}

export default ImpStoreDbAdapter;
