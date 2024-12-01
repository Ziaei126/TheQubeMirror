import prisma from '/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req) {
  try {
    const body = await req.json();
    const { customer_email, children } = body;

    // Update registration details in the database
    await Promise.all(
      children.map((child) =>
        prisma.Registration.update({
            where: {
                id: parseInt(child.regId)  // Assuming each child object has `id`
              },
              data: {
                paid: true,
                payRef: 'no amount due. (previous yearly payment)',
                paymentPlan: 'year',
                confirmed: true
              }
        })
      )
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error('Error updating registration:', error);
    return new Response(JSON.stringify({ ok: false, error: 'Internal server error' }), { status: 500 });
  }
}