'use client';

import { PersonalInfo, ValidationErrors } from '@/types/questionnaire';
import { NumberInput } from '../form-fields/NumberInput';
import { RadioGroup } from '../form-fields/RadioGroup';
import { UnitSelector } from '../form-fields/UnitSelector';
import { useTranslations } from 'next-intl';

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
  errors: ValidationErrors;
}

export function PersonalInfoStep({ data, onChange, errors }: PersonalInfoStepProps) {
  const t = useTranslations('questionnaire.step1');

  const genderOptions = [
    { value: 'male', label: t('genderOptions.male') },
    { value: 'female', label: t('genderOptions.female') },
    { value: 'other', label: t('genderOptions.other') },
    { value: 'preferNotToSay', label: t('genderOptions.preferNotToSay') },
  ];

  const weightUnitOptions = [
    { value: 'kg', label: 'kg' },
    { value: 'lbs', label: 'lbs' },
  ];

  const heightUnitOptions = [
    { value: 'cm', label: 'cm' },
    { value: 'ft-in', label: 'ft/in' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        {t('title')}
      </h2>

      <NumberInput
        label={t('age')}
        value={data.age}
        onChange={(value) => onChange({ age: value })}
        placeholder={t('agePlaceholder')}
        min={13}
        max={100}
        error={errors.age}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('weight')}
        </label>
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <input
              type="number"
              value={data.weight}
              onChange={(e) => onChange({ weight: e.target.value })}
              placeholder={t('weightPlaceholder')}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition-colors ${
                           errors.weight
                             ? 'border-red-500 dark:border-red-400'
                             : 'border-gray-300 dark:border-gray-600'
                         }`}
            />
          </div>
          <UnitSelector
            value={data.weightUnit}
            onChange={(value) => onChange({ weightUnit: value as 'kg' | 'lbs' })}
            options={weightUnitOptions}
          />
        </div>
        {errors.weight && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.weight}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('height')}
        </label>
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <input
              type="number"
              value={data.height}
              onChange={(e) => onChange({ height: e.target.value })}
              placeholder={t('heightPlaceholder')}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition-colors ${
                           errors.height
                             ? 'border-red-500 dark:border-red-400'
                             : 'border-gray-300 dark:border-gray-600'
                         }`}
            />
          </div>
          <UnitSelector
            value={data.heightUnit}
            onChange={(value) => onChange({ heightUnit: value as 'cm' | 'ft-in' })}
            options={heightUnitOptions}
          />
        </div>
        {errors.height && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.height}</p>
        )}
      </div>

      <RadioGroup
        label={t('gender')}
        value={data.gender}
        onChange={(value) => onChange({ gender: value as PersonalInfo['gender'] })}
        options={genderOptions}
        error={errors.gender}
      />
    </div>
  );
}
