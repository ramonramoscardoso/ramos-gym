import { QuestionnaireSubmission } from '@/types/questionnaire';
import { saveQuestionnaireSubmission, StoredQuestionnaireSubmission } from '@/lib/repositories/questionnaire-repository';
import { saveWorkoutPlan, StoredWorkoutPlan } from '@/lib/repositories/workout-repository';
import { generateMockWorkoutPlan, mockSubmission } from '@/lib/domain/mock-plan';

export type PersistQuestionnairePayload = {
  submission?: QuestionnaireSubmission;
  userId?: string;
};

export type PersistQuestionnaireResult = {
  submissionId: string;
  planId: string;
};

export async function persistQuestionnaire(
  payload: PersistQuestionnairePayload
): Promise<PersistQuestionnaireResult> {
  const submission = payload?.submission ?? mockSubmission;
  const userId = payload?.userId ?? 'anonymous';
  const now = new Date();
  const plan = generateMockWorkoutPlan(submission);

  const savedSubmission: StoredQuestionnaireSubmission = {
    ...submission,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  const submissionResult = await saveQuestionnaireSubmission(savedSubmission);

  const workoutDocument: StoredWorkoutPlan = {
    userId,
    submissionId: submissionResult.insertedId,
    title: plan.title,
    summary: plan.summary,
    goal: plan.goal,
    experienceLevel: plan.experienceLevel,
    weeklyStructure: plan.weeklyStructure,
    recoveryNote: plan.recoveryNote,
    highlights: plan.highlights,
    days: plan.days,
    questionnaire: submission,
    equipment: submission.availability.equipment,
    daysPerWeek: submission.availability.daysPerWeek,
    timePerSession: submission.availability.timePerSession,
    aiMetadata: {
      model: 'mock',
      prompt: 'generated from mock submission',
      generationDate: now,
    },
    duration: plan.days[0]?.duration ?? null,
    source: 'mock',
    createdAt: now,
    updatedAt: now,
  };

  const workoutResult = await saveWorkoutPlan(workoutDocument);

  return {
    submissionId: submissionResult.insertedId.toString(),
    planId: workoutResult.insertedId.toString(),
  };
}
