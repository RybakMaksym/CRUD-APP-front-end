export type FilterOption = 'default' | 'country' | 'city' | 'age';

export type FilterFields = Omit<FilterOption, 'default'>;

export type FilterableFields = Omit<FilterFields, 'age'>;
