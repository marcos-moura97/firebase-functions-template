import * as functions from "firebase-functions";

const admin = require("firebase-admin");
const queryString = require("query-string");

import FirebaseAdapter from "./system/crud/firebase-adapter";
import { Item, User } from "./system/models";
import { storeDbInitialize } from "./system/resolver";
import ImpStoreDbAdapter from "./system/stores/db/storedb-adapter-imp";
import { filtersInitialize } from "./system/stores/filters";
import { ItemCrud } from "./system/stores/itens";
import { UserCrud } from "./system/stores/users";
import { parseToSearchParams, tokenGetId, tryHandler } from "./system/utils";

admin.initializeApp();

const firebaseAdapter = new FirebaseAdapter();
const userCrud = new UserCrud();
const itemCrud = new ItemCrud();

filtersInitialize();
storeDbInitialize(new ImpStoreDbAdapter(firebaseAdapter));

export const users = functions.https.onRequest(async (req, res) => {
  await tryHandler(req, res, async () => {
    const token = req.query.token as string;
    const uid = await tokenGetId(token);
    const jSearchParams = queryString.parse(req.query.searchParams);
    const searchParams = parseToSearchParams(jSearchParams);

    console.log(uid);

    const response = await userCrud.SearchUsers(uid, searchParams);
    res.send(response);
  });
});

export const user = functions.https.onRequest(async (req, res) => {
  await tryHandler(req, res, async () => {
    const token = req.query.token as string;
    const uid = await tokenGetId(token);

    const response = await userCrud.GetUser(uid);
    res.send(response);
  });
});

export const createUser = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid as string;
  const inData = data as User;

  return await userCrud.CreateUser(uid, inData);
});

export const updateUser = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid as string;
  const inData = data as User;

  return await userCrud.UpdateUser(uid, inData);
});

export const products = functions.https.onRequest(async (req, res) => {
  await tryHandler(req, res, async () => {
    const search = parseToSearchParams(req.query);
    const response = await itemCrud.SearchItems(search);
    res.send(response);
  });
});

export const myItens = functions.https.onCall(async (data, context) => {
  //const uid = context.auth?.uid as string;
  const pid = data.userId as string;

  return await itemCrud.GetUserItems(pid);
});

export const createItens = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid as string;
  const pData = data as Item;

  return await itemCrud.CreateItem(pData, uid);
});

export const updateItem = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid as string;
  const productId = data.productId as string;

  return await itemCrud.UpdateItem(data, uid, productId);
});

export const deleteItem = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid as string;
  const productId = data.productId as string;

  return await itemCrud.DeleteItem(uid, productId);
});
