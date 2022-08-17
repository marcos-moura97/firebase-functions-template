import { dict, Item, ItemResponse, UserItens } from "../../models";
import { storeDB } from "../../resolver";
import { FiltrateUserItens } from "../filters";

export class ItemCrud {
  filter: FiltrateUserItens;

  constructor() {
    this.filter = new FiltrateUserItens();
  }

  async CreateItem(data: Item, userId: string): Promise<Object> {
    data.creationTime = Date.now();
    const response = storeDB.pushItem(data, userId);

    return !(response == null);
  }

  async SearchItems(searchParams: dict<string[]>): Promise<ItemResponse[]> {
    let userItens = await storeDB.getUserItens();

    userItens = await this.filter.FiltrateUserItens(userItens, searchParams);
    const itemsResponse = this.toItems(userItens);

    return itemsResponse;
  }

  async GetUserItems(userId: string): Promise<ItemResponse[]> {
    let userItens = await storeDB.getItens(userId);

    const itemsResponse: ItemResponse[] = [];

    for (const itemKey in userItens) {
      const item = userItens[itemKey];

      const returnItem: ItemResponse = {
        id: itemKey,
        title: item.title,
        userId: item.userId,
        category: item.category,
        available: item.available,
        creationTime: item.creationTime,
      };
      itemsResponse.push(returnItem);
    }

    return itemsResponse;
  }

  async toItems(users: dict<UserItens>): Promise<ItemResponse[]> {
    const response: ItemResponse[] = [];
    for (const key in users) {
      const user = users[key];
      for (const itemKey in user.Itens) {
        console.log(user);
        const item = user.Itens[itemKey];

        const returnItem: ItemResponse = {
          id: itemKey,
          title: item.title,
          userId: item.userId,
          category: item.category,
          available: item.available,
          creationTime: item.creationTime,
        };
        response.push(returnItem);
      }
    }

    return response;
  }

  async UpdateItem(
    data: Item,
    userId: string,
    itemId: string
  ): Promise<Object> {
    const item = await storeDB.getItem(userId, itemId);

    if (data.hasOwnProperty("title")) item.title = data.title;

    if (data.hasOwnProperty("userId")) item.userId = data.userId;

    if (data.hasOwnProperty("category")) item.category = data.category;

    if (data.hasOwnProperty("available")) item.available = data.available;

    try {
      storeDB.setItem(userId, itemId, item);

      return true;
    } catch {
      return false;
    }
  }

  async DeleteItem(userId: string, itemId: string): Promise<void> {
    storeDB.setItem(userId, itemId, null);
  }
}
