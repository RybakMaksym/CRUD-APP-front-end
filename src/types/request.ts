import type { IPagination } from '@/types/navigation';

export interface IFormWithIdParams {
  id: string;
  formData: FormData;
}

export interface IPaginationWithIdParams {
  id: string;
  pagination: IPagination;
}
