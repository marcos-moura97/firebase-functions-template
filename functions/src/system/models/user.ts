import { Address } from "./address";

export type User = {
  name: string;
  email: string;
  phone: number;
  address: Address;
  creationTime: number;
};

export interface UserResponse extends User {
  id: string;
}
