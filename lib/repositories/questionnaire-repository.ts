import { getCollection } from '@/lib/mongodb';
import { QuestionnaireSubmission } from '@/types/questionnaire';
import { InsertOneResult } from 'mongodb';

export interface StoredQuestionnaireSubmission extends QuestionnaireSubmission {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function saveQuestionnaireSubmission(
  submission: StoredQuestionnaireSubmission
): Promise<InsertOneResult<StoredQuestionnaireSubmission>> {
  const collection = await getCollection<StoredQuestionnaireSubmission>('questionnaireSubmissions');
  return collection.insertOne(submission);
}
