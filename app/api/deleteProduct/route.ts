import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        const res = await prisma.product.delete({
            where: {
                id
            }
        })
        return NextResponse.json(res)
    } catch (error) {

    }
}