'use client'
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import React, { HtmlHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'
const AddForm = () => {
    const { pending } = useFormStatus()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const productData = {
                name: formData.get('name'),
                quantity: Number(formData.get('quantity')),
                price: Number(formData.get('price'))
            };
            const response = await fetch('/api/addProducts', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            if (!response.ok) {
                throw new Error('error creation')
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            console.log("product created");

        },
        onError: (error) => {
            console.log("Error while creation of product", error)
        }
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        mutation.mutate(formData)
    }

    const BtnSubmit = () => {
        return <button disabled={mutation.isPending || pending}
            type='submit'
            className='mx-2 text-white bg-gray-500 hover:bg-gray-700 p-3 border'
        >
            {mutation.isPending || pending ? "Creation..." : "Create product"}

        </button>
    }
    return (
        <form onSubmit={handleSubmit} className='max-w-[1000px] flex items-center mb-2 '>
            <input
                type="text"
                name="name"
                required
                placeholder='name the product'
                className='h-[50px] border border-gray-300 p-2 '
            />
            <input
                type="number"
                name="quantity"
                required
                placeholder='numberof quantity'
                className='h-[50px] border border-gray-300 p-2 ml-2 '
            />
            <input
                type="number"
                name="price"
                required
                step='0.01'
                placeholder='price'
                className='h-[50px] border border-gray-300 p-2 ml-2 '
            />
            <BtnSubmit />
        </form>
    )
}

export default AddForm

