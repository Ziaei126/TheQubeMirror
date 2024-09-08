import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import prisma from '/lib/prisma';
import { revalidateTag } from 'next/cache'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY;
  const sig = headers().get('stripe-signature');
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400
    });
  }
  

  if (event.type == 'checkout.session.completed') {
  const data = event.data.object;
  const metadata = data.metadata;
  const children = JSON.parse(metadata.childrenMeta)
  const scholarship = JSON.parse(metadata.ScholarshipMeta)
  
  const ref = data.id;
  //console.log("reg id: ", reg_id )
  console.log('event.type: ', event.type)
  console.log("data: ", data )
  console.log("meta data: ", metadata) 
  
  try {

    // Update all children registrations
  for (let child of children) {
    const registrationUpdate = await prisma.registration.update({
      where: {
        id: parseInt(child.regId)  // Assuming each child object has `id`
      },
      data: {
        paid: true,
        payRef: ref,
        scholarship_essay: scholarship?.essay || null,  // Assuming `scholarship` has an `amount` field
        scholarship_amount: scholarship?.amount || null,
        paymentPlan: child.plan
      }
    });

    console.log(`Updated registration for child ${child.name} with ID ${child.id}`);
  }
  revalidateTag('term_register')
    return new Response('Payment Registered', {
      status: 200
    }) 

  } catch (error) {
    console.log('server error:', error)
    return new Response('Server error', {
      status: 500
    });
  } }
  
  return new Response("event not supported", {
    status: 400
  })
}
