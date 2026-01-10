'use client';

import { HealthLimitations, ValidationErrors } from '@/types/questionnaire';
import { CheckboxGroup } from '../form-fields/CheckboxGroup';
import { useTranslations } from 'next-intl';

interface HealthLimitationsStepProps {
  data: HealthLimitations;
  onChange: (data: Partial<HealthLimitations>) => void;
  errors: ValidationErrors;
}

export function HealthLimitationsStep({ data, onChange, errors }: HealthLimitationsStepProps) {
  const t = useTranslations('questionnaire.step4');

  const conditionOptions = [
    { value: 'none', label: t('conditionOptions.none') },
    { value: 'jointIssues', label: t('conditionOptions.jointIssues') },
    { value: 'cardiovascular', label: t('conditionOptions.cardiovascular') },
    { value: 'recentInjuries', label: t('conditionOptions.recentInjuries') },
    { value: 'pregnancy', label: t('conditionOptions.pregnancy') },
    { value: 'other', label: t('conditionOptions.other') },
  ];

  const showOtherInput = data.conditions.includes('other');

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        {t('title')}
      </h2>

      <CheckboxGroup
        label={t('conditions')}
        values={data.conditions}
        onChange={(values) => onChange({ conditions: values })}
        options={conditionOptions}
        error={errors.conditions}
      />

      {showOtherInput && (
        <div className="mb-4">
          <input
            type="text"
            value={data.conditionsOther}
            onChange={(e) => onChange({ conditionsOther: e.target.value })}
            placeholder="Please specify..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('limitations')}
        </label>
        <textarea
          value={data.limitations}
          onChange={(e) => onChange({ limitations: e.target.value })}
          placeholder={t('limitationsPlaceholder')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.medicalClearance}
            onChange={(e) => onChange({ medicalClearance: e.target.checked })}
            className="mt-1 text-blue-600 focus:ring-blue-500 rounded"
          />
          <span className={`text-sm ${
            errors.medicalClearance
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}>
            {t('medicalClearance')}
          </span>
        </label>
        {errors.medicalClearance && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.medicalClearance}</p>
        )}
      </div>
    </div>
  );
}
