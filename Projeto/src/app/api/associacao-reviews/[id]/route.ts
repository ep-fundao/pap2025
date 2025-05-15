import { getAssociacaoReviews } from '@/libs/apis';
import { NextResponse, type NextRequest } from 'next/server';

type Params = {
  id: string;
};
export async function GET(
  req: NextRequest,
  { params }: { params: Params } // Explicitly define the type for params
) {
  const associacaoId = params.id;

  try {
    const associacaoReviews = await getAssociacaoReviews(associacaoId);

    return NextResponse.json(associacaoReviews, {
      status: 200,
      statusText: 'Successful',
    });
  } catch (error) {
    console.error('Getting Review Failed', error);
    return new NextResponse('Unable to fetch', { status: 400 });
  }
}