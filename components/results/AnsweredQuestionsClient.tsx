'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useStoredQuestionnaire } from './useStoredQuestionnaire';

export function AnsweredQuestionsClient() {
  const t = useTranslations('results');
  const tQuestionnaire = useTranslations('questionnaire');
  const { submission, hasStoredData, isLoaded } = useStoredQuestionnaire();

  const genderLabel = submission.personalInfo.gender
    ? tQuestionnaire(`step1.genderOptions.${submission.personalInfo.gender}`)
    : '-';
  const goalLabel = submission.goalsExperience.primaryGoal
    ? tQuestionnaire(`step2.goalOptions.${submission.goalsExperience.primaryGoal}`)
    : '-';
  const experienceLabel = submission.goalsExperience.experienceLevel
    ? tQuestionnaire(`step2.experienceLevels.${submission.goalsExperience.experienceLevel}`)
    : '-';

  const equipmentLabels = submission.availability.equipment.map((item) =>
    tQuestionnaire(`step3.equipmentOptions.${item}`),
  );
  const conditionLabels = submission.healthLimitations.conditions.map((item) =>
    tQuestionnaire(`step4.conditionOptions.${item}`),
  );

  const sections = [
    {
      title: tQuestionnaire('step1.title'),
      items: [
        { label: tQuestionnaire('step1.age'), value: submission.personalInfo.age },
        { label: tQuestionnaire('step1.weight'), value: `${submission.personalInfo.weight} ${submission.personalInfo.weightUnit}` },
        { label: tQuestionnaire('step1.height'), value: `${submission.personalInfo.height} ${submission.personalInfo.heightUnit}` },
        { label: tQuestionnaire('step1.gender'), value: genderLabel },
      ],
    },
    {
      title: tQuestionnaire('step2.title'),
      items: [
        { label: tQuestionnaire('step2.primaryGoal'), value: goalLabel },
        { label: tQuestionnaire('step2.experienceLevel'), value: experienceLabel },
      ],
    },
    {
      title: tQuestionnaire('step3.title'),
      items: [
        { label: tQuestionnaire('step3.daysPerWeek'), value: String(submission.availability.daysPerWeek) },
        { label: tQuestionnaire('step3.timePerSession'), value: `${submission.availability.timePerSession || '-'} min` },
        { label: tQuestionnaire('step3.equipment'), value: equipmentLabels.join(', ') || '-' },
      ],
    },
    {
      title: tQuestionnaire('step4.title'),
      items: [
        { label: tQuestionnaire('step4.conditions'), value: conditionLabels.join(', ') || '-' },
        { label: tQuestionnaire('step4.limitations'), value: submission.healthLimitations.limitations || '-' },
        {
          label: tQuestionnaire('step4.medicalClearance'),
          value: submission.healthLimitations.medicalClearance ? t('answers.yes') : t('answers.no'),
        },
      ],
    },
  ];

  if (submission.healthLimitations.conditions.includes('other') && submission.healthLimitations.conditionsOther) {
    sections[3].items.splice(1, 0, {
      label: t('answers.otherCondition'),
      value: submission.healthLimitations.conditionsOther,
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/30 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <section className="rounded-3xl bg-white p-8 shadow-xl shadow-emerald-100/60 ring-1 ring-slate-200 dark:bg-gray-900 dark:shadow-none dark:ring-gray-800">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              {t('answers.badge')}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">{t('answers.title')}</h1>
            <p className="mt-4 text-slate-600 dark:text-gray-300">{t('answers.subtitle')}</p>
          </section>

          {!hasStoredData && isLoaded && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
              {t('mockNotice')}
            </section>
          )}

          <section className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200 dark:bg-gray-900 dark:shadow-none dark:ring-gray-800"
              >
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
                <dl className="mt-5 space-y-4">
                  {section.items.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-gray-800">
                      <dt className="text-sm font-medium text-slate-500 dark:text-gray-400">{item.label}</dt>
                      <dd className="mt-1 text-base text-slate-900 dark:text-white">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </section>

          <section className="flex flex-wrap gap-4">
            <Link
              href="/plan"
              className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {t('answers.viewPlan')}
            </Link>
            <Link
              href="/questionnaire"
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('answers.editAnswers')}
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
