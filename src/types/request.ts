import type { FilterableFields, FilterFields } from '@/types/filter.type';
import type { IPagination } from '@/types/navigation';

export interface IFormWithIdParams {
  id: string;
  formData: FormData;
}

export interface IPaginationWithIdParams {
  id: string;
  pagination: IPagination;
}

export interface IFieldQueryParams<T extends FilterableFields | FilterFields> {
  field: T;
  query: string;
}
