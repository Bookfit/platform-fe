import { BookSpaceListParams } from '@/services/bookspace/list/type';

export const bookSpaceQueryOptions = {
  all: () => ['bookSpace'] as const,
  categories: () => [...bookSpaceQueryOptions.all(), 'categories'] as const,
  main: () => [...bookSpaceQueryOptions.all(), 'main'] as const,
  createMain: () => [...bookSpaceQueryOptions.all(), 'createMain'] as const,
  list: (params: BookSpaceListParams) =>
    [...bookSpaceQueryOptions.all(), 'list', params] as const,
};

export const userQueryOptions = {
  all: () => ['user'] as const,
  info: () => [...userQueryOptions.all(), 'info'] as const,
};
