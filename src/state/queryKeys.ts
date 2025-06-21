export const bookSpaceQueryOptions = {
  all: () => ['bookSpace'] as const,
  demoUser: () => [...bookSpaceQueryOptions.all(), 'demoUser'] as const,
  categories: () => [...bookSpaceQueryOptions.all(), 'categories'] as const,
  main: () => [...bookSpaceQueryOptions.all(), 'main'] as const,
  createMain: () => [...bookSpaceQueryOptions.all(), 'createMain'] as const,
  create: () => [...bookSpaceQueryOptions.all(), 'create'] as const,
};

export const userQueryOptions = {
  all: () => ['user'] as const,
  info: () => [...userQueryOptions.all(), 'info'] as const,
};
