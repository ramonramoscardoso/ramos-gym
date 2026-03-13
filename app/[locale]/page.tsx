import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

const steps = [
  {
    icon: '📝',
    titleKey: 'step1.title',
    descriptionKey: 'step1.description',
  },
  {
    icon: '🎯',
    titleKey: 'step2.title',
    descriptionKey: 'step2.description',
  },
  {
    icon: '💪',
    titleKey: 'step3.title',
    descriptionKey: 'step3.description',
  },
];

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 text-slate-900 dark:text-white transition-colors">
      <div className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <section className="rounded-[36px] bg-white shadow-2xl shadow-blue-200/40 ring-1 ring-slate-200 dark:bg-slate-900 dark:shadow-none dark:ring-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 px-9 py-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-100">
                {t('howItWorksTitle')}
              </p>
              <h1 className="mt-3 text-4xl font-bold">{t('title')}</h1>
              <p className="mt-4 text-lg text-blue-50">{t('tagline')}</p>
            </div>
            <div className="grid gap-5 px-10 py-9 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.titleKey}
                  className="rounded-3xl bg-slate-50 p-6 shadow-sm shadow-slate-200 dark:bg-slate-800 dark:shadow-none ring-1 ring-slate-100 dark:ring-gray-800"
                >
                  <div className="text-3xl">{step.icon}</div>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {t(step.titleKey)}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {t(step.descriptionKey)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 dark:bg-slate-900 dark:shadow-none dark:ring-gray-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('ctaTitle')}</h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{t('ctaDescription')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/questionnaire"
                className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-400/40 transition hover:bg-blue-700"
              >
                {t('ctaButton')}
              </Link>
              <Link
                href="/plan"
                className="rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                Preview mock plan
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
