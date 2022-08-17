import { FiltersMap } from "./filter";
import Item from "./item";

export default function filtersInitialize() {
  FiltersMap["item"] = (tags: string[]) => new Item(tags);
}
