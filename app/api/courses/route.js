import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export default async function GET(req, res) {
    try {
        const courses = await prisma.course.findMany()
        console.log(courses)
        return NextResponse.json({courses});
    } catch (err) {

        return NextResponse.json({error: err})

    }
    
}


