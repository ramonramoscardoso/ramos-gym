'use client';

import { GoalsExperience, ValidationErrors } from '@/types/questionnaire';
import { RadioGroup } from '../form-fields/RadioGroup';
import { useTranslations } from 'next-intl';

interface GoalsExperienceStepProps {
  data: GoalsExperience;
  onChange: (data: Partial<GoalsExperience>) => void;
  errors: ValidationErrors;
}

export function GoalsExperienceStep({ data, onChange, errors }: GoalsExperienceStepProps) {
  const t = useTranslations('questionnaire.step2');

  const goalOptions = [
    { value: 'weightLoss', label: t('goalOptions.weightLoss') },
    { value: 'muscleGain', label: t('goalOptions.muscleGain') },
    { value: 'strength', label: t('goalOptions.strength') },
    { value: 'endurance', label: t('goalOptions.endurance') },
    { value: 'general', label: t('goalOptions.general') },
    { value: 'flexibility', label: t('goalOptions.flexibility') },
  ];

  const experienceOptions = [
    { value: 'beginner', label: t('experienceLevels.beginner') },
    { value: 'intermediate', label: t('experienceLevels.intermediate') },
    { value: 'advanced', label: t('experienceLevels.advanced') },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        {t('title')}
      </h2>

      <RadioGroup
        label={t('primaryGoal')}
        value={data.primaryGoal}
        onChange={(value) => onChange({ primaryGoal: value as GoalsExperience['primaryGoal'] })}
        options={goalOptions}
        error={errors.primaryGoal}
      />

      <RadioGroup
        label={t('experienceLevel')}
        value={data.experienceLevel}
        onChange={(value) => onChange({ experienceLevel: value as GoalsExperience['experienceLevel'] })}
        options={experienceOptions}
        error={errors.experienceLevel}
      />
    </div>
  );
}
