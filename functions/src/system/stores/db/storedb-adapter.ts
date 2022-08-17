import { dict, Item, Itens, User, UserItens } from "../../models";

export interface storeDbAdapter {
  getUser(id: string): Promise<User>;
  pushUser(uid: string, user: User): Promise<string>;
  setUser(key: string, user: User | null): void;
  getUserItens(): Promise<dict<UserItens>>;
  getItens(userId: string): Promise<Itens>;
  getItem(userId: string, itemId: string): Promise<Item>;
  setItem(userId: string, itemId: string, item: Item | null): void;
  pushItem(item: Item, userId: string): Promise<string>;
}
