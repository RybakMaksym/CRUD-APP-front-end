import type { FilterableFields, FilterFields } from '@/types/filter.type';

export interface IFormWithIdParams {
  id: string;
  formData: FormData;
}

export interface ISuggestionParams {
  field: FilterableFields;
  query: string;
}

export interface IFilterParams {
  field: FilterFields;
  query: string;
}
