import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

    const { id, name, quantity, price } = await request.json()
    try {
        const product = await prisma.product.update({
            where: { id },
            data:{
                id,name,quantity,price
            }
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error while Updating product.' }, { status: 500 })
    }
}