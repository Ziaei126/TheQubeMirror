
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
  const yearPrice = 775;
  const termPrice = 305;

  const data = await request.json();

  const {customer_email, children, donation, scholarship, discountCode } = data

  // Convert children into a JSON string
  const childrenMeta = JSON.stringify(children);
  const ScholarshipMeta = JSON.stringify(scholarship)

  console.log(scholarship)

  let discountAmount = 0;

    switch (discountCode.trim().toUpperCase()) {
      case 'QUBERAGAIN':
      case 'SECONDQUBER':
      case 'MESSENGER10':
      case 'EARLYQUBER':
      case 'QUBERSTAFF24':
        discountAmount = 30;
        break;
      case 'QUBERVOLUNTEERF24':
      case 'QUBERVOLUNTEERP24':
        discountAmount = 260;
        break;
      case 'GIRLS7PLUS':
        discountAmount = 92;
        break;
      // case 'YAFATEMEH':
      //   discountAmount = 40;
      //   break;
      default:
        break;
    }

  // Assuming scholarship.amount is available
  let scholarship_id;

  if (scholarship?.amount == 0.75) {
    scholarship_id = process.env.SCHOLARSHIP_75_ID;
  } else if (scholarship?.amount == 0.5) {
    scholarship_id = process.env.SCHOLARSHIP_50_ID;
  } else if (scholarship?.amount == 0.25) {
    scholarship_id = process.env.SCHOLARSHIP_25_ID;
  } else {
    // Handle cases where there's no matching amount
    scholarship_id = null; // or handle with a default value
  }

  // Create line items with adjusted prices based on the total discount
  const line_items = children.map((child) => {
    const basePrice = child.plan === 'year' ? yearPrice : termPrice;
    const adjustedPrice = child.plan === 'year' ? basePrice : basePrice - discountAmount; // Spread discount across children

    return {
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `${child.name} (${child.plan} price) ${child.plan === 'year' ? "" : "- " + discountCode}`,
        },
        unit_amount: adjustedPrice * 100, // Stripe works with amounts in cents/pence
      },
      quantity: 1,
    };
  });

  if (donation) {
    line_items.push({
      price: process.env.DONATION_PRICE_ID,
      quantity: 1
    })
  }

  const checkout = {
    customer_email: customer_email,
    line_items ,
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/register/success?scholarship=${scholarship?.applied || false}&donation=${donation}`,
    cancel_url: `${process.env.BASE_URL}/register/cancel`,
    metadata: {
      childrenMeta,
      ScholarshipMeta
    },
  }
  if (scholarship?.applied) {
    checkout.discounts = [
      {
        coupon: scholarship_id
      },
    ] 
  }
  

  console.log(scholarship_id)
  

  
  try {
    const checkoutSession =
      await stripe.checkout.sessions.create(checkout);
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}
