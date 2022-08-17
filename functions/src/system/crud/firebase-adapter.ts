const admin = require("firebase-admin");

export default class FirebaseAdapter implements dbAdapter {
  async getStorage(endpoint: string): Promise<any> {
    const bucket = admin.storage().bucket();
    const file = bucket.file(endpoint);

    const response = file
      .getSignedUrl({
        action: "read",
        expires: "01-01-2500",
      })
      .then(function (signedUrls: Object[]): Object {
        return signedUrls[0];
      });
    return response;
  }

  async get(endpoint: string): Promise<any> {
    const snapshot = await admin.database().ref(endpoint).once("value");

    return await snapshot.val();
  }

  async set(endpoint: string, value: any) {
    await admin.database().ref(endpoint).set(value);
  }

  async setId(endpoint: string, value: any, id: string) {
    const reference = await admin.database().ref(endpoint).child(id).set(value);
    await reference.set(value);

    return reference.key;
  }

  async update(endpoint: string, value: any) {
    await await admin.database().ref(endpoint).update(value);
  }

  async remove(endpoint: string) {
    await await admin.database().ref(endpoint).remove();
  }

  async push(endpoint: string, value: any): Promise<string> {
    const reference = await admin.database().ref(endpoint).push();
    if (reference?.key == null) throw new Error("Cannot push on " + endpoint);

    await reference.set(value);

    return reference.key;
  }

  async userData(uid: string): Promise<any> {
    return await admin.auth().getUser(uid);
  }
}
