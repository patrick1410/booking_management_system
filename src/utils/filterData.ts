// Utility function to perform search on any data
export const filterData = <T>(
  data: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  const lowerCasedTerm = searchTerm.toLowerCase();
  return data.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerCasedTerm);
    })
  );
};
