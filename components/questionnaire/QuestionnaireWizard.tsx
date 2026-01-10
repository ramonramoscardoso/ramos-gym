'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { FormData, ValidationErrors } from '@/types/questionnaire';
import { StepIndicator } from './StepIndicator';
import { NavigationButtons } from './NavigationButtons';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { GoalsExperienceStep } from './steps/GoalsExperienceStep';
import { AvailabilityStep } from './steps/AvailabilityStep';
import { HealthLimitationsStep } from './steps/HealthLimitationsStep';

const TOTAL_STEPS = 4;

export function QuestionnaireWizard() {
  const t = useTranslations('questionnaire');
  const tValidation = useTranslations('questionnaire.validation');
  const tNavigation = useTranslations('questionnaire.navigation');
  const router = useRouter();
  const locale = useLocale();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      age: '',
      weight: '',
      weightUnit: 'kg',
      height: '',
      heightUnit: 'cm',
      gender: '',
    },
    goalsExperience: {
      primaryGoal: '',
      experienceLevel: '',
    },
    availability: {
      daysPerWeek: 3,
      timePerSession: '',
      equipment: [],
    },
    healthLimitations: {
      conditions: [],
      conditionsOther: '',
      limitations: '',
      medicalClearance: false,
    },
  });

  const updatePersonalInfo = (data: Partial<typeof formData.personalInfo>) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const updateGoalsExperience = (data: Partial<typeof formData.goalsExperience>) => {
    setFormData((prev) => ({
      ...prev,
      goalsExperience: { ...prev.goalsExperience, ...data },
    }));
  };

  const updateAvailability = (data: Partial<typeof formData.availability>) => {
    setFormData((prev) => ({
      ...prev,
      availability: { ...prev.availability, ...data },
    }));
  };

  const updateHealthLimitations = (data: Partial<typeof formData.healthLimitations>) => {
    setFormData((prev) => ({
      ...prev,
      healthLimitations: { ...prev.healthLimitations, ...data },
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      const { age, weight, height, gender } = formData.personalInfo;
      if (!age) newErrors.age = tValidation('required');
      else if (parseInt(age) < 13) newErrors.age = tValidation('minAge');
      else if (parseInt(age) > 100) newErrors.age = tValidation('maxAge');

      if (!weight) newErrors.weight = tValidation('required');
      else if (parseFloat(weight) <= 0) newErrors.weight = tValidation('positiveNumber');

      if (!height) newErrors.height = tValidation('required');
      else if (parseFloat(height) <= 0) newErrors.height = tValidation('positiveNumber');

      if (!gender) newErrors.gender = tValidation('required');
    }

    if (step === 2) {
      const { primaryGoal, experienceLevel } = formData.goalsExperience;
      if (!primaryGoal) newErrors.primaryGoal = tValidation('required');
      if (!experienceLevel) newErrors.experienceLevel = tValidation('required');
    }

    if (step === 3) {
      const { daysPerWeek, timePerSession, equipment } = formData.availability;
      if (!daysPerWeek || daysPerWeek < 1 || daysPerWeek > 7) {
        newErrors.daysPerWeek = tValidation('required');
      }
      if (!timePerSession) newErrors.timePerSession = tValidation('required');
      if (equipment.length === 0) newErrors.equipment = tValidation('selectAtLeastOne');
    }

    if (step === 4) {
      const { medicalClearance } = formData.healthLimitations;
      if (!medicalClearance) {
        newErrors.medicalClearance = tValidation('medicalClearanceRequired');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      setErrors({});
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        locale,
      };

      // Log to console for now
      console.log('Questionnaire Data:', submissionData);

      // Save to localStorage
      localStorage.setItem('questionnaireData', JSON.stringify(submissionData));

      // TODO: In the future, send to API
      // await fetch('/api/questionnaire', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submissionData),
      // });

      // Redirect to home page for now (will create completion page later)
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={updatePersonalInfo}
            errors={errors}
          />
        );
      case 2:
        return (
          <GoalsExperienceStep
            data={formData.goalsExperience}
            onChange={updateGoalsExperience}
            errors={errors}
          />
        );
      case 3:
        return (
          <AvailabilityStep
            data={formData.availability}
            onChange={updateAvailability}
            errors={errors}
          />
        );
      case 4:
        return (
          <HealthLimitationsStep
            data={formData.healthLimitations}
            onChange={updateHealthLimitations}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {renderStep()}

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        previousLabel={tNavigation('previous')}
        nextLabel={tNavigation('next')}
        submitLabel={tNavigation('submit')}
      />
    </div>
  );
}
