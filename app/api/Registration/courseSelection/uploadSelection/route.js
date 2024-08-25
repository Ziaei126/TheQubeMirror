
import { prisma } from '/lib/prisma';

export async function POST(req, res) {
    const data = await req.json()
  try{
  
    const selection = await prisma.CourseChoice.create({
      data: {...data.content, 
        
      application: {
        connect: {id: data.id}
      }
      }
    });
    console.log(selection)
    if (!selection) {
      return Response.error() //json({ error: 'Parent not found for the associated user.' }, { status: 404 })
    }
    return  Response.json(selection)
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}