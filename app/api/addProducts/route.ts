import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, quantity, price } = await request.json()

    console.log('name ', name)
    try {
        const product = await prisma.product.create({
            data: {
                name, quantity, price
            }
        })
        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error while creation product' }, { status: 500 })

    }
} 