'use server';

import { NextResponse } from 'next/server';
import { persistQuestionnaire, PersistQuestionnairePayload } from '@/lib/services/persist-questionnaire';

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json().catch(() => ({}));
    const payload = rawPayload as PersistQuestionnairePayload;
    const result = await persistQuestionnaire(payload);

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error('Persist failure', error);
    return NextResponse.json({ ok: false, message: 'Unable to persist workout data' }, { status: 500 });
  }
}
