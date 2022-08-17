import { dict, UserItens } from "../../models";

export interface Filter {
  Execute(partners: dict<UserItens>): Promise<dict<UserItens>>;
}

export const FiltersMap: dict<(tags: string[]) => Filter> = {};

class FiltrateUserItens {
  async FiltrateUserItens(
    UserItenss: dict<UserItens>,
    searchParams: dict<string[]>
  ): Promise<dict<UserItens>> {
    const filters = this.createFilters(searchParams);
    if (filters.length > 0)
      return await this.excuteFilters(filters, UserItenss);

    return {};
  }

  createFilters(searchParams: dict<string[]>): Filter[] {
    const filters: Filter[] = [];
    for (const key in searchParams) {
      const tags = searchParams[key];
      if (tags != undefined) filters.push(this.tryCreateFilter(key, tags));
    }

    return filters;
  }

  tryCreateFilter(filterName: string, tags: string[]): Filter {
    if (FiltersMap.hasOwnProperty(filterName))
      return FiltersMap[filterName](tags);

    throw new Error("Cannot initialize " + filterName);
  }

  async excuteFilters(
    filters: Filter[],
    UserItenss: dict<UserItens>
  ): Promise<dict<UserItens>> {
    let response: dict<UserItens> = {};
    let partnersAux = UserItenss;

    for (const filter of filters) {
      partnersAux = await filter.Execute(partnersAux);
      response = partnersAux;
    }

    return response;
  }
}

export default FiltrateUserItens;
