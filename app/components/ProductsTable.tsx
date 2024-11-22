'use client'
import { Product } from '@/utils/Types'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import DeleteButton from './DeleteButton'

const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products')
        if (!response.ok) {
            throw new Error('Error while creation.')
        }
        return response.json()
    } catch (error) { }
}
const ProductsTable = () => {
    const { data: products, error, isLoading } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts
    })
    if (isLoading) {
        return <p className='text-center'>Loading...</p>
    }
    if (error) {
        return <p className='text-center text-red-500'>Error while creation...</p>
    }
    return (
        <>
            {
                products?.length &&
                <div className=''>
                    <table className='min-w-full bg-white border border-gray-200 shadow-md rounded-lg'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border-b border-gray-300 px-4 py-2 text-left text-gray-700'>
                                    ID
                                </th>
                                <th className='border-b border-gray-300 px-4 py-2 text-left text-gray-700'>
                                    name
                                </th>
                                <th className='border-b border-gray-300 px-4 py-2 text-left text-gray-700'>
                                    quantity
                                </th>
                                <th className='border-b border-gray-300 px-4 py-2 text-left text-gray-700'>
                                    price
                                </th>
                                <th className='border-b border-gray-300 px-4 py-2 text-left text-gray-700'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { products.map((product, index) => (
                                    <tr key={index} className='hover:bg-gray-500 transition-all duration-200'>
                                        <td className='border-b border-gray-300 px-4 py-2'>
                                            {product.id}
                                        </td>
                                        <td className='border-b border-gray-300 px-4 py-2'>
                                            {product.name}
                                        </td>
                                        <td className='border-b border-gray-300 px-4 py-2'>
                                            {product.quantity}
                                        </td>
                                        <td className='border-b border-gray-300 px-4 py-2'>
                                            {product.price}
                                        </td>
                                        <td className='border-b border-gray-300 px-4 py-2 flex gap-2'>
                                            <Link href={`product/${product.id}`} >
                                                <button className='text-white bg-yellow-800 hover:bg-yellow-900 p-2 rounded-md'>
                                                    Update
                                                </button>
                                            </Link>
                                            <DeleteButton id={product.id} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}
export default ProductsTable