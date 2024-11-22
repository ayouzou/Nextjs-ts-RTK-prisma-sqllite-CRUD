import prisma from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    } catch (error) {

    }
}