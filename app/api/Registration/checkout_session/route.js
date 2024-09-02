
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
  const data = await request.json();
  const customer_email = data.customer_email;
  const reg_id = data.reg_id;
  const yearPay = data.yearPay;

  const checkout = {
    customer_email: customer_email,
    allow_promotion_codes: true,
    line_items: [
      {
        price: process.env.TERM_PRICE_ID,
        quantity: yearPay ? 3 : 1
      }
    ],
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/register/success`,
    cancel_url: `${process.env.BASE_URL}/register/cancel`,
    metadata: {
      reg_id
    } 
  }

  if (yearPay) {

    checkout.discounts = [{
      coupon: process.env.YEAR_SIGN_UP_COUPON,
    }];

  }
  
  try {
    const checkoutSession =
      await stripe.checkout.sessions.create(checkout);
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}
