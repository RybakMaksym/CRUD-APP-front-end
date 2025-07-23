export interface IPagination {
  page: number;
  limit: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  nextPage: number | null;
}

export interface ISearch {
  query: string;
}
