export interface IApiResponse<T> {
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
  errorCode?: string;
  timestamp: string;
}