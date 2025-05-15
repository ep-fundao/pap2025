import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSocio, updateAssociacao } from '@/libs/apis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16',
});

const checkoutSessionCompleted = 'checkout.session.completed';

// Tipagem opcional para metadata (Stripe armazena tudo como string)
type CheckoutMetadata = {
  adults: string;
  associacao: string;
  user: string;
  discount: string;
  totalPrice: string;
  isAnual: string;
};

export async function POST(req: Request) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new NextResponse('Missing Stripe signature or webhook secret', {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    console.error('Webhook verification failed:', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case checkoutSessionCompleted: {
      const session = event.data.object as Stripe.Checkout.Session;

      const metadata = session.metadata as CheckoutMetadata | null;

      if (!metadata) {
        return new NextResponse('Missing metadata in session', { status: 400 });
      }

      const { adults, associacao, user, discount, totalPrice, isAnual } = metadata;

      try {
        // Cria novo sócio
        await createSocio({
          adults: Number(adults),
          associacao,
          discount: Number(discount),
          totalPrice: Number(totalPrice),
          user,
          isAnual: isAnual === 'true',
        });

        // Atualiza associação
        await updateAssociacao(associacao);

        return NextResponse.json('Booking successful', {
          status: 200,
          statusText: 'Booking Successful',
        });
      } catch (err: any) {
        console.error('Error processing booking:', err.message);
        return new NextResponse('Server error during booking', { status: 500 });
      }
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
      return NextResponse.json('Event received', {
        status: 200,
        statusText: 'Event Received',
      });
  }
}