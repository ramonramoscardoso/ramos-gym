import { getRequestConfig } from 'next-intl/server';

export const locales = ['pt-BR', 'en-US'] as const;
export const defaultLocale = 'pt-BR' as const;

export default getRequestConfig(async ({ locale }) => {
  // Use default locale if none is provided
  const resolvedLocale = locale || defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
