'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { generateMockWorkoutPlan } from '@/lib/domain/mock-plan';
import { useStoredQuestionnaire } from './useStoredQuestionnaire';

export function WorkoutPlanClient() {
  const t = useTranslations('results');
  const { submission, hasStoredData, isLoaded } = useStoredQuestionnaire();
  const plan = generateMockWorkoutPlan(submission);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <section className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-100/60 ring-1 ring-slate-200 dark:bg-gray-900 dark:shadow-none dark:ring-gray-800">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 px-8 py-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                {t('plan.badge')}
              </p>
              <h1 className="mt-3 text-4xl font-bold">{plan.title}</h1>
              <p className="mt-4 max-w-2xl text-base text-blue-50">{plan.summary}</p>
            </div>

            <div className="grid gap-4 px-8 py-8 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-gray-800">
                <p className="text-sm text-slate-500 dark:text-gray-400">{t('plan.goal')}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{plan.goal}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-gray-800">
                <p className="text-sm text-slate-500 dark:text-gray-400">{t('plan.level')}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{plan.experienceLevel}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-gray-800">
                <p className="text-sm text-slate-500 dark:text-gray-400">{t('plan.structure')}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{plan.weeklyStructure}</p>
              </div>
            </div>

            <div className="border-t border-slate-200 px-8 py-6 dark:border-gray-800">
              <p className="text-sm font-medium text-slate-500 dark:text-gray-400">{t('plan.recovery')}</p>
              <p className="mt-2 text-slate-700 dark:text-gray-300">{plan.recoveryNote}</p>
            </div>

            <div className="border-t border-slate-200 px-8 py-6 dark:border-gray-800">
              <div className="flex flex-wrap gap-3">
                {plan.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {!hasStoredData && isLoaded && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
              {t('mockNotice')}
            </section>
          )}

          <section className="grid gap-5 md:grid-cols-2">
            {plan.days.map((day) => (
              <article
                key={day.day}
                className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200 dark:bg-gray-900 dark:shadow-none dark:ring-gray-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                      {t('plan.dayLabel', { day: day.day })}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{day.title}</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-gray-800 dark:text-gray-200">
                    {day.duration}
                  </span>
                </div>

                <p className="mt-3 text-slate-600 dark:text-gray-300">{day.focus}</p>

                <div className="mt-5 space-y-4">
                  {day.sections.map((section) => (
                    <div key={`${day.day}-${section.label}`}>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-gray-400">
                        {section.label}
                      </h3>
                      <ul className="mt-2 space-y-2 text-slate-700 dark:text-gray-300">
                        {section.exercises.map((exercise) => (
                          <li key={exercise} className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-gray-800">
                            {exercise}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="flex flex-wrap gap-4">
            <Link
              href="/answers"
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t('plan.viewAnswers')}
            </Link>
            <Link
              href="/questionnaire"
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('plan.editAnswers')}
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
