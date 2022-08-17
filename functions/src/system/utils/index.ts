const admin = require("firebase-admin");

import { dict } from "../models";

export function parseToSearchParams(query: any): dict<string[]> {
  const response: dict<string[]> = {};
  for (const key in query) {
    response[key] = String(query[key]).split(",");
  }

  return response;
}

export async function tokenGetId(token: string): Promise<string> {
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
}

export async function tryHandler(
  req: any,
  res: any,
  func: () => Promise<void>
) {
  try {
    await func();
  } catch (error) {
    console.error(error);
    res.status(400).send((error as Error).message);
  }
}
