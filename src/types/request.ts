import type { FilterableFields, FilterFields } from '@/types/filter.type';

export interface IFormWithIdParams {
  id: string;
  formData: FormData;
}

export interface IFieldQueryParams<T extends FilterableFields | FilterFields> {
  field: T;
  query: string;
}
