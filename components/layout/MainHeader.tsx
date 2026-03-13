'use client';

import { Link } from '@/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useTranslations } from 'next-intl';

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/questionnaire', labelKey: 'nav.questionnaire' },
  { href: '/plan', labelKey: 'nav.plan' },
  { href: '/answers', labelKey: 'nav.answers' },
];

export function MainHeader() {
  const t = useTranslations('home');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-gray-800 dark:bg-slate-900/85">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
