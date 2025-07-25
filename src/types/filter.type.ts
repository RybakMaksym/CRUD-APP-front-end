import type { FilterOption } from '@/enums/filter.enums';

export type FilterFields = Omit<FilterOption, 'default'>;

export type FilterableFields = Omit<FilterFields, 'age'>;
