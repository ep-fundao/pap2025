import { getAssociacaoReviews } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const associacaoId = params.id;

  try {
    const associacaoReviews = await getAssociacaoReviews(associacaoId);

    return NextResponse.json(associacaoReviews, {
      status: 200,
      statusText: 'Succesful',
    });
  } catch (error) {
    console.log('Getting Review Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}
