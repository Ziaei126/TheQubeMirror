const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    try {
    const session = await getServerSession(req,
      {
        ...res,
        getHeader: (name) => res.headers?.get(name),
        setHeader: (name, value) => res.headers?.set(name, value),
      }, options)
    
    if (!session || !session.accessToken) {
      return Response.error("unaothorized")// json({ error: 'Unauthorised' }, { status: 401 }); res.status(401).send(response.text);
    }
    const accountId = session.accountId
    console.log(accountId)
      // Find the account using the access token
      const account = await prisma.account.findFirst({
        where: {
          providerAccountId: accountId,
        },
        include: {
          user: true, // Include the associated user
        },
      });
      
      if (!account || !account.user) {
        // Handle the case where the account or user is not found
        console.log("user not found")
        return Response.error()  // json({ error: 'User not found for the given access token.' }, { status: 404 }) 
      }

      //const data = await req.json()

      const strip_session = await stripe.checkout.sessions.create({
        customer_email: 'customer@example.com',
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Pj8TeILdZ7gqSmF6jcfviHN',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `localhost:3000`,
        cancel_url: `localhost:3000`,
      });
      


      if (!stripe_session) {
        return Response.error() //json({ error: 'Parent not found for the associated user.' }, { status: 404 })
      }

      return  Response.json({})
    } catch (error) {
      console.log(error)
      return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
    }
    
  }