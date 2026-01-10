import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header with controls */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            {t('tagline')}
          </p>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {t('howItWorksTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {t('step1.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('step1.description')}
                </p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {t('step2.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('step2.description')}
                </p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">💪</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {t('step3.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('step3.description')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="mb-6">
              {t('ctaDescription')}
            </p>
            <Link
              href="/questionnaire"
              className="inline-block bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
