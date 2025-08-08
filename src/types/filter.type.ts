import type { FilterOption } from '@/enums/filter';

export type FilterFields = Omit<FilterOption, FilterOption.DEFAULT>;

export type FilterableFields = Omit<FilterFields, FilterOption.AGE>;
