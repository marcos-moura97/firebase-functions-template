export interface dict<T> {
  [key: string]: T;
}

export interface validationResponse {
  success: boolean;
  payload: string;
}
