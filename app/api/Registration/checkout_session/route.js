
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
  const data = await request.json();
  const {customer_email} = data
  
  try {
    const checkoutSession =
      await stripe.checkout.sessions.create({
        customer_email: customer_email,
        line_items: [
          {
            price: 'price_1PsYJMILdZ7gqSmFduAH6911',
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/register/success`,
        cancel_url: `${process.env.BASE_URL}/register/cancel`,
        
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}