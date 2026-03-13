'use client';

import { useEffect, useState } from 'react';
import { QuestionnaireSubmission } from '@/types/questionnaire';
import { mockSubmission } from '@/lib/domain/mock-plan';

const STORAGE_KEY = 'questionnaireData';

export function useStoredQuestionnaire() {
  const [submission, setSubmission] = useState<QuestionnaireSubmission>(mockSubmission);
  const [hasStoredData, setHasStoredData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      setIsLoaded(true);
      return;
    }

    try {
      const parsedValue = JSON.parse(storedValue) as QuestionnaireSubmission;
      setSubmission(parsedValue);
      setHasStoredData(true);
    } catch (error) {
      console.error('Failed to parse questionnaire data:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  return { submission, hasStoredData, isLoaded };
}
