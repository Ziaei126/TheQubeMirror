
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
  const data = await request.json();
  const customer_email = data.customer_email;
  const reg_id = data.reg_id;
  
  try {
    const checkoutSession =
      await stripe.checkout.sessions.create({
        customer_email: customer_email,
        line_items: [
          {
            price: process.env.TERM_PRICE_ID,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/register/success`,
        cancel_url: `${process.env.BASE_URL}/register/cancel`,
        metadata: {
          reg_id
        }
        
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}
