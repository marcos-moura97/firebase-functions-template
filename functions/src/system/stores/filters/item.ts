import { Itens, UserItens, dict } from "../../models";
import { Filter } from "./filter";

class Item implements Filter {
  items: string[];

  constructor(tags: string[]) {
    this.items = [];

    this.Parse(tags);
  }

  Parse(tags: string[]): void {
    this.items = tags;
  }

  async Execute(partners: dict<UserItens>): Promise<dict<UserItens>> {
    const response: dict<UserItens> = {};

    for (const partnerKey in partners) {
      const items = partners[partnerKey].Itens;
      if (items != undefined) {
        this.items.forEach((itemName) => {
          const menuResponse: Itens = {};
          for (const menuKey in items) {
            const item = items[menuKey];
            if (item.category.toLowerCase().includes(itemName))
              menuResponse[menuKey] = item;
          }

          if (Object.keys(menuResponse).some((x) => true)) {
            response[partnerKey] = Object.assign(partners[partnerKey]);
            response[partnerKey].Itens = menuResponse;
          }
        });
      }
    }

    return response;
  }
}

export default Item;
