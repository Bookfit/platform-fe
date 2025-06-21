export const bookSpaceQueryOptions = {
  all: () => ['bookSpace'] as const,
  categories: () => [...bookSpaceQueryOptions.all(), 'categories'] as const,
  main: () => [...bookSpaceQueryOptions.all(), 'main'] as const,
  createMain: () => [...bookSpaceQueryOptions.all(), 'createMain'] as const,
};
