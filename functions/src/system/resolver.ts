import { storeDbAdapter } from "./stores/db/storedb-adapter";

export let storeDB: storeDbAdapter;

export function storeDbInitialize(dbAdapter: storeDbAdapter) {
  storeDB = dbAdapter;
}
