'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/i18n';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Get the current path segments
    const segments = pathname.split('/').filter(Boolean);

    // Check if first segment is a locale
    const hasLocaleInPath = locales.includes(segments[0] as any);

    let newPath;
    if (hasLocaleInPath) {
      // Replace the locale
      segments[0] = newLocale;
      newPath = '/' + segments.join('/');
    } else {
      // Add the locale
      newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`;
    }

    // Use window.location for a full page navigation
    window.location.href = newPath;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('language')}:
      </span>
      <div className="flex gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLanguageChange(loc)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              locale === loc
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {loc === 'pt-BR' ? 'PT' : 'EN'}
          </button>
        ))}
      </div>
    </div>
  );
}
