import { dict } from "./structs";
import { User } from "./user";

export type Item = {
  userId: string;
  title: string;
  category: string;
  available: boolean;
  photo?: Object;
  creationTime: number;
};

export type Itens = dict<Item>;

export interface ItemResponse extends Item {
  id: string;
}

export interface UserItens extends User {
  Itens: Itens;
}
