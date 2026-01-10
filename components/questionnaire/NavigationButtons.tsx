'use client';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  previousLabel: string;
  nextLabel: string;
  submitLabel: string;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
  previousLabel,
  nextLabel,
  submitLabel,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                   text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {previousLabel}
      </button>

      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg
                     hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg
                     hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
