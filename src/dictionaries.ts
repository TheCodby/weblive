import "server-only";
export const getDictionary = async (locale: string) =>
  (await import(`./messages/${locale}.json`)).default;
