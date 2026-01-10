'use client';

import { Availability, ValidationErrors } from '@/types/questionnaire';
import { NumberInput } from '../form-fields/NumberInput';
import { CheckboxGroup } from '../form-fields/CheckboxGroup';
import { useTranslations } from 'next-intl';

interface AvailabilityStepProps {
  data: Availability;
  onChange: (data: Partial<Availability>) => void;
  errors: ValidationErrors;
}

export function AvailabilityStep({ data, onChange, errors }: AvailabilityStepProps) {
  const t = useTranslations('questionnaire.step3');

  const timeOptions = [
    { value: '30', label: '30 min' },
    { value: '45', label: '45 min' },
    { value: '60', label: '60 min' },
    { value: '90', label: '90 min' },
    { value: '120', label: '120 min' },
  ];

  const equipmentOptions = [
    { value: 'fullGym', label: t('equipmentOptions.fullGym') },
    { value: 'freeWeights', label: t('equipmentOptions.freeWeights') },
    { value: 'machines', label: t('equipmentOptions.machines') },
    { value: 'bodyweight', label: t('equipmentOptions.bodyweight') },
    { value: 'homeEquipment', label: t('equipmentOptions.homeEquipment') },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        {t('title')}
      </h2>

      <NumberInput
        label={t('daysPerWeek')}
        value={String(data.daysPerWeek)}
        onChange={(value) => onChange({ daysPerWeek: parseInt(value) || 0 })}
        placeholder="3"
        min={1}
        max={7}
        error={errors.daysPerWeek}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('timePerSession')}
        </label>
        <select
          value={data.timePerSession}
          onChange={(e) => onChange({ timePerSession: e.target.value as Availability['timePerSession'] })}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700
                     text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500
                     focus:border-transparent transition-colors ${
                       errors.timePerSession
                         ? 'border-red-500 dark:border-red-400'
                         : 'border-gray-300 dark:border-gray-600'
                     }`}
        >
          <option value="">Select duration</option>
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.timePerSession && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.timePerSession}</p>
        )}
      </div>

      <CheckboxGroup
        label={t('equipment')}
        values={data.equipment}
        onChange={(values) => onChange({ equipment: values })}
        options={equipmentOptions}
        error={errors.equipment}
      />
    </div>
  );
}
