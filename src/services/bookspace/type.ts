export interface CategoryItem {
  code: string;
  name: string;
}

export interface CategoryResponse {
  categories: CategoryItem[];
  facilities: CategoryItem[];
}
