import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params
    try {
        const product = await prisma.product.findUnique({ where: { id } })

        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Error while creation product.' }, { status: 500 })
    }
}