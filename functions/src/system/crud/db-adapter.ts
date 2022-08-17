interface dbAdapter {
  get(endpoint: string): Promise<any>;
  set(endpoint: string, value: any): Promise<void>;
  setId(endpoint: string, value: any, id: string): Promise<string>;
  push(endpoint: string, value: any): Promise<string>;
  getStorage(endpoint: string): Promise<any>;
  userData(uid: string): Promise<any>;
}
