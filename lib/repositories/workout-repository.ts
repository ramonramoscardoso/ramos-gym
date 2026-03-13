import { getCollection } from '@/lib/mongodb';
import { QuestionnaireSubmission, WorkoutPlan } from '@/types/questionnaire';
import { InsertOneResult, ObjectId } from 'mongodb';

export interface StoredWorkoutPlan extends WorkoutPlan {
  userId: string;
  submissionId: ObjectId;
  questionnaire: QuestionnaireSubmission;
  equipment: string[];
  daysPerWeek: number;
  timePerSession: QuestionnaireSubmission['availability']['timePerSession'];
  aiMetadata: {
    model: string;
    prompt: string;
    generationDate: Date;
  };
  source: string;
  duration: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function saveWorkoutPlan(
  workout: StoredWorkoutPlan
): Promise<InsertOneResult<StoredWorkoutPlan>> {
  const collection = await getCollection<StoredWorkoutPlan>('workoutPlans');
  return collection.insertOne(workout);
}
