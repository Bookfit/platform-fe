export const bookSpaceQueryOptions = {
  all: () => ["bookSpace"] as const,
  categories: () => [...bookSpaceQueryOptions.all(), "categories"] as const,
};
