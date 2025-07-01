import Link from 'next/link'
import React from 'react'

const ButtonCheckOut = ({bookId}) => {
  return (
    <div className='bg-green-500 p-2 rounded-md text-primary'>
        <Link href={'/dashbaord/checkout/'+ bookId}>Check out</Link>
    </div>
  )
}

export default ButtonCheckOut