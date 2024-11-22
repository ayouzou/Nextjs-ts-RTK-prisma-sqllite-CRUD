import React from 'react'

const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    const response = await fetch('/api/deleteProduct', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    if (response.ok) {
      console.log('Product deleted')
    }
  }
  return (
    <form onSubmit={handleDelete}>
      <button type='submit' className='text-white bg-red-500 hover:bg-red-600 p-2 rounded-md'>
        Delete
      </button>
    </form>
  )
}
export default DeleteButton