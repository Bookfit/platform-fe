import { CategoryItem } from '@/services/bookspace/detail/type';

export interface BookSpaceListItem {
  id: number;
  userId: number;
  loginType: string;
  name: string;
  address: string | null;
  detailAddress: string | null;
  lat: number | null;
  lon: number | null;
  weekdayHours: string | null;
  weekendHours: string | null;
  description: string;
  status: 'PENDING' | 'REGISTERED';
  categories: CategoryItem[];
  facilities: CategoryItem[];
}

export interface BookSpaceListParams {
  page: number;
  size: number;
  sort: string;
}

export type BookSpaceListResponse = BookSpaceListItem[];

export interface BookSpaceListRegisterParams {
  sampleId: number;
  userId: number;
  longitude: string;
  status: string;
}

export type BookSpaceListRegisterResponse = BookSpaceListRegisterParams;
