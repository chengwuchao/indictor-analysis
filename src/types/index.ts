export interface HttpResponse<T> {
  code: string;
  msg: string;
  data: T;
}
