export interface CategoryItem {
  code: string;
  name: string;
}

export interface CategoryResponse {
  categories: CategoryItem[];
  facilities: CategoryItem[];
}

export interface BookSpaceDetailRequest {
  userId: number;
  loginType: string;
  name: string;
  categories: CategoryItem[];
  address: string;
  detailAddress: string;
  lat: number;
  lon: number;
  weekdayHours: string;
  weekendHours: string;
  facilities: CategoryItem[];
  description: string;
}
