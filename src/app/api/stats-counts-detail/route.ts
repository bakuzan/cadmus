import { NextResponse } from 'next/server';

import { getBookHistoryForPeriod } from '@/database/statistics';

export async function POST(req: Request) {
  const body = await req.json();
  const history = await getBookHistoryForPeriod(body.historyIds);

  return NextResponse.json({ period: body.period, history });
}
