export interface ResponseDTO<T = any> {
  code: number;
  message: string;
  data: T;
}
