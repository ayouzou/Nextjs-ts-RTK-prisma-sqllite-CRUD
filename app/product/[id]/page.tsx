'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
interface Params {
  id: string
}
interface UpdatePageProps {
  params: Params
}


const fetchProduct = async (id: string) => {
  console.log('id',id)
  const response = await fetch(`/api/${id}`)
  if (!response.ok) {
    // setError("products not-found")
    return;
  }
   return response.json()
  // setProduct(data)
};
const page = ({ params }: UpdatePageProps) => {
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);
  const id1 = '8d46eabe-3723-4869-9306-9ddde28a879f'
  const router = useRouter()
  const { data: product, error, isLoading } = useQuery<any>({ queryKey: ['product'], queryFn: () => fetchProduct(params.id) })
  console.log("product",product)

  if (error) {
    return (
      <div className='h-screen w-full flex items-center justify-center flex-col pt-10'>
        <Link href={'/'} className='text-blue-600 hover:underline'>Back</Link>
      </div>
    )
  }
  if (isLoading) {
    return <div>
      Loading...
    </div>
  }
  const { id, name, quantity, price } = product
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/updateProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name: formData.get('name'),
        quantity: Number(formData.get('quantity')),
        price: Number(formData.get('price'))
      })
    })
    if (response.ok) {
      router.push('/')
    }
    else {
      const errorData = await response.json();
      console.log('error while creation of product.')
    }
  }
  return (
    <div className='h-screen w-full flex items-center justify-center flex-col pt-10 bg-gray-300'>
      <Link href={'/'} className='text-blue-600 hover:underline'>Back</Link>
      <form onSubmit={handleSubmit} className='max-w-md w-full bg-white shadow-md rounded-md p-6 flex flex-col space-y-4 '>
        <input type="hidden" name="id" value={id} />
        <input
          type="text"
          name='name'
          required
          placeholder='Update name of product '
          defaultValue={name}
          className='h-[50px]  border border-gray-300 p-2 ml-2'
        />
        <input
          type="number"
          name='quantity'
          step={'0.01'}
          required
          placeholder='Update name of product '
          defaultValue={quantity}
          className='h-[50px]  border border-gray-300 p-2 ml-2'

        />
        <input
          type="number"
          name='price'
          required
          step={'0.01'}
          placeholder='Update name of product '
          defaultValue={price}
          className='h-[50px]  border border-gray-300 p-2 ml-2'
        />
        <button type='submit' className='mx-2 text-white bg-gray-500 hover:bg-gray-700 p-3 border'>
          Submit
        </button>
      </form>
    </div>
  )
}
export default page