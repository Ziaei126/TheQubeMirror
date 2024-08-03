import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(request) {
    
  try {
    
    // you can implement some basic check here like, is user valid or not
    const data = await request.json();
    
    const customer_email = data.customer_email
   
    const checkoutSession =
      await stripe.checkout.sessions.create({
        customer_email: customer_email,
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/register`,
        cancel_url: `http://localhost:3000/register`,
        
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}